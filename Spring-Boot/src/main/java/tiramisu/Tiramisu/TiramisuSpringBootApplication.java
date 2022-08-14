package tiramisu.Tiramisu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// annotation help: https://stackoverflow.com/a/40388609
@SpringBootApplication(scanBasePackages = "tiramisu")
@EntityScan("tiramisu.DataBase.DTO")
@EnableJpaRepositories("tiramisu.DataBase.DAO")
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
