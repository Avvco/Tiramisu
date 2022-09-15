package tiramisu.Request_Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
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

import reactor.core.publisher.Mono;
import tiramisu.Service.BlockChain_Client;
import tiramisu.Service.Permission_Control_Service;

@RestController
public class Request_Controller {

  private static final String FHIR_BASE_URL = "http://hapi-fhir:8080/fhir";

  protected static final WebClient webClient = WebClient.builder()
                                                  .exchangeStrategies(ExchangeStrategies.builder()
                                                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1000000)).build()).build();

  // https://stackoverflow.com/questions/68012444/unable-to-read-properties-using-value-in-springboot-application
  @Autowired
  private BlockChain_Client bc;

 
  
  @GetMapping("/")
	public String hello() {
		return "999999";
	}

  @GetMapping("/123")
	public Mono<String> smartContract() {
		return Mono.just(bc.ModifyContract());
	}

  @GetMapping("/header")
  public Mono<String> getHeader(@RequestHeader Map<String, String> headers) {
    return Mono.just(headers.toString());
  }

  @GetMapping("/forward_to_fhir/**")
  public Mono<String> forwardedGet(@RequestHeader Map<String, String> headers, ServerHttpRequest serverHttpRequest) {
    String currentUrl = serverHttpRequest.getURI().toString();
    String forwardedUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());
    return Mono.just("OK")
                .flatMap(t -> {
                  if(Permission_Control_Service.permissionControl()) {
                    return webClient.get()
                    .uri(FHIR_BASE_URL + forwardedUrl)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .retrieve()
                    .bodyToMono(String.class);
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @DeleteMapping("/forward_to_fhir/**")
  public Mono<String> forwardedDelete(@RequestHeader Map<String, String> headers, ServerHttpRequest serverHttpRequest) {
    String currentUrl = serverHttpRequest.getURI().toString();
    String forwardedUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());
    return Mono.just("OK")
                .flatMap(t -> {
                  if(Permission_Control_Service.permissionControl()) {
                    return webClient.delete()
                    .uri(FHIR_BASE_URL + forwardedUrl)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .retrieve()
                    .bodyToMono(String.class);
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PostMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPost(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    JsonNode tree = OBJECT_MAPPER.readTree(body);

    String currentUrl = serverHttpRequest.getURI().toString();
    String forwardedUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());

    return Mono.just("OK")
                .flatMap(t -> {
                  if(Permission_Control_Service.permissionControl()) {
                    return webClient.post()
                    .uri(FHIR_BASE_URL + forwardedUrl)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(tree.toString()))
                    .retrieve()
                    .bodyToMono(String.class);
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PutMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPut(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    JsonNode tree = OBJECT_MAPPER.readTree(body);

    String currentUrl = serverHttpRequest.getURI().toString();
    String forwardedUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());

    return Mono.just("OK")
                .flatMap(t -> {
                  if(Permission_Control_Service.permissionControl()) {
                    return webClient.put()
                    .uri(FHIR_BASE_URL + forwardedUrl)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(tree.toString()))
                    .retrieve()
                    .bodyToMono(String.class);
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @PatchMapping(value="/forward_to_fhir/**", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> forwardedPatch(@RequestHeader Map<String, String> headers, @RequestBody String body, ServerHttpRequest serverHttpRequest) throws JsonMappingException, JsonProcessingException {
    ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    JsonNode tree = OBJECT_MAPPER.readTree(body);

    String currentUrl = serverHttpRequest.getURI().toString();
    String forwardedUrl = currentUrl.substring(currentUrl.indexOf("/forward_to_fhir") + "/forward_to_fhir".length());

    return Mono.just("OK")
                .flatMap(t -> {
                  if(Permission_Control_Service.permissionControl()) {
                    return webClient.patch()
                    .uri(FHIR_BASE_URL + forwardedUrl)
                    .headers(httpHeaders -> httpHeaders.setAll(headers))
                    .body(BodyInserters.fromValue(tree.toString()))
                    .retrieve()
                    .bodyToMono(String.class);
                  }else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
                  }
                });
  }

  @GetMapping("/fhir/metadata")
  public Mono<String> uploadItems() {

    return Mono.just("OK")
                .flatMap(t -> {
                  //throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
                  return webClient.get()
                    .uri(FHIR_BASE_URL + "/metadata")
                    .retrieve()
                    .bodyToMono(String.class);
                });
  }
}