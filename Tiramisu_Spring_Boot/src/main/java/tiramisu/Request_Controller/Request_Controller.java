package tiramisu.Request_Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@RestController
public class Request_Controller {

  @GetMapping("/")
	public String hello() {
		return "999999";
	}

  @GetMapping("/fhir")
  public Mono<Object> uploadItems() {
    return Mono.just("999999")
        .flatMap(im -> WebClient
            .create("http://hapi-fhir:8080//fhir/api-docs")
            .get().exchangeToMono(responce -> {
              return Mono.just(responce);
            }));
  }
}
