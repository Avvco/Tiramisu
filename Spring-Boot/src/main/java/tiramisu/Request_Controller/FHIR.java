package tiramisu.Request_Controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import tiramisu.Service.Permission_Control_Service;
import tiramisu.Tiramisu.TiramisuSpringBootApplication;

@RestController
@CrossOrigin(TiramisuSpringBootApplication.CORS)
@Slf4j
public class FHIR {

  private static final String FHIR_BASE_URL = "http://hapi-fhir:8080/fhir";

  private static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  protected static final WebClient webClient = WebClient.builder()
                                                  .exchangeStrategies(ExchangeStrategies.builder()
                                                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1000000)).build()).build();

  private Permission_Control_Service pcs = new Permission_Control_Service();

  // https://stackoverflow.com/questions/68012444/unable-to-read-properties-using-value-in-springboot-application
  //@Autowired
  //private BlockChain_Client bc;

  @GetMapping("/forward_to_fhir/**")
  public Mono<String> forwardedGet(@RequestHeader Map<String, String> headers, ServerHttpRequest serverHttpRequest) {
    return Mono.just(serverHttpRequest)
                .flatMap(req -> Mono.just(FHIR_BASE_URL + getForwardUrl(req)))
                .flatMap(url -> {
                  if(pcs.permissionControl()) {
                    log.info("Received \"GET\" from " + serverHttpRequest.getURI().toString() + ", forwarding to " + url);
                    return webClient.get()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .exchangeToMono(responseHandler -> {
                      log.info("Response from " + url + " returned with status code " + responseHandler.statusCode().toString());
                      if (responseHandler.statusCode().is2xxSuccessful()) {
                        return responseHandler.bodyToMono(String.class);
                      } else {
                        throw new ResponseStatusException(responseHandler.statusCode(), responseHandler.toString());
                      }
                    });
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @DeleteMapping("/forward_to_fhir/**")
  public Mono<String> forwardedDelete(@RequestHeader Map<String, String> headers, ServerHttpRequest serverHttpRequest) {
    return Mono.just(serverHttpRequest)
                .flatMap(req -> Mono.just(FHIR_BASE_URL + getForwardUrl(req)))
                .flatMap(url -> {
                  if(pcs.permissionControl()) {
                    log.info("Received \"DELETE\" from " + serverHttpRequest.getURI().toString() + ", forwarding to " + url);
                    return webClient.delete()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .exchangeToMono(responseHandler -> {
                      log.info("Response from " + url + " returned with status code " + responseHandler.statusCode().toString());
                      if (responseHandler.statusCode().is2xxSuccessful()) {
                        return responseHandler.bodyToMono(String.class);
                      } else {
                        throw new ResponseStatusException(responseHandler.statusCode(), responseHandler.toString());
                      }
                    });
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PostMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPost(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    return Mono.just(serverHttpRequest)
                .flatMap(req -> Mono.just(FHIR_BASE_URL + getForwardUrl(req)))
                .flatMap(url -> {
                  if(pcs.permissionControl()) {
                    log.info("Received \"POST\" from " + serverHttpRequest.getURI().toString() + ", forwarding to " + url);
                    return webClient.post()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(getForwardBody(body)))
                    .exchangeToMono(responseHandler -> {
                      log.info("Response from " + url + " returned with status code " + responseHandler.statusCode().toString());
                      if (responseHandler.statusCode().is2xxSuccessful()) {
                        return responseHandler.bodyToMono(String.class);
                      } else {
                        throw new ResponseStatusException(responseHandler.statusCode(), responseHandler.toString());
                      }
                    });
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PutMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPut(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    return Mono.just(serverHttpRequest)
                .flatMap(req -> Mono.just(FHIR_BASE_URL + getForwardUrl(req)))
                .flatMap(url -> {
                  if(pcs.permissionControl()) {
                    log.info("Received \"PUT\" from " + serverHttpRequest.getURI().toString() + ", forwarding to " + url);
                    return webClient.put()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(getForwardBody(body)))
                    .exchangeToMono(responseHandler -> {
                      log.info("Response from " + url + " returned with status code " + responseHandler.statusCode().toString());
                      if (responseHandler.statusCode().is2xxSuccessful()) {
                        return responseHandler.bodyToMono(String.class);
                      } else {
                        throw new ResponseStatusException(responseHandler.statusCode(), responseHandler.toString());
                      }
                    });
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PatchMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPatch(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    return Mono.just(serverHttpRequest)
                .flatMap(req -> Mono.just(FHIR_BASE_URL + getForwardUrl(req)))
                .flatMap(url -> {
                  if(pcs.permissionControl()) {
                    log.info("Received \"PATCH\" from " + serverHttpRequest.getURI().toString() + ", forwarding to " + url);
                    return webClient.patch()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(getForwardBody(body)))
                    .exchangeToMono(responseHandler -> {
                      log.info("Response from " + url + " returned with status code " + responseHandler.statusCode().toString());
                      if (responseHandler.statusCode().is2xxSuccessful()) {
                        return responseHandler.bodyToMono(String.class);
                      } else {
                        throw new ResponseStatusException(responseHandler.statusCode(), responseHandler.toString());
                      }
                    });
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  private String getForwardUrl(ServerHttpRequest request) {
    String currentUrl = request.getURI().toString();
    String forwardUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());
    return forwardUrl;
  }

  private String getForwardBody(String body) {
    JsonNode tree = null;
    try {
      tree = OBJECT_MAPPER.readTree(body);
      return tree.toString();
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return null;
  }
}