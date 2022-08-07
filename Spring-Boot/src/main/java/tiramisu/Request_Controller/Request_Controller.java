package tiramisu.Request_Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;
import tiramisu.Service.BlockChain_Client;

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
