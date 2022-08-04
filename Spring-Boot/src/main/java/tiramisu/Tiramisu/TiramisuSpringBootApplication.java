package tiramisu.Tiramisu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "tiramisu.Tiramisu", "tiramisu.Request_Controller"} )
public class TiramisuSpringBootApplication {

  public static final Logger log = LoggerFactory.getLogger(TiramisuSpringBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TiramisuSpringBootApplication.class, args);    

    log.info(
      "\n----------------------------------------------------------------------\n\t" + 
      "Application '{}' is running!\n" + 
      "----------------------------------------------------------------------",
      TiramisuSpringBootApplication.class.getSimpleName()
    );
	}
}
