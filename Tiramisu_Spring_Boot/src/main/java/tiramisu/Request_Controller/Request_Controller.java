package tiramisu.Request_Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Mono;

@RestController
public class Request_Controller {

  private static final Logger log = LoggerFactory.getLogger(Request_Controller.class);
  private static final String FHIR_BASE_URL = "http://hapi-fhir:8080/fhir";

  protected static final WebClient webClient = WebClient.builder()
                                                  .exchangeStrategies(ExchangeStrategies.builder()
                                                    .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1000000)).build()).build();
  
  @GetMapping("/")
	public String hello() {
		return "999999";
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
