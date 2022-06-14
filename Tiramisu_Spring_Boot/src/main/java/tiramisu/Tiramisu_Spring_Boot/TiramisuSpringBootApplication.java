package tiramisu.Tiramisu_Spring_Boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TiramisuSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiramisuSpringBootApplication.class, args);
	}

  @RequestMapping("/")
	public String hello() {
		return "999999";
	}

}
