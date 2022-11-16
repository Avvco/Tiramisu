package tiramisu.Tiramisu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import lombok.extern.slf4j.Slf4j;

// annotation help: https://stackoverflow.com/a/40388609
@SpringBootApplication(scanBasePackages = "tiramisu")
@EntityScan("tiramisu.DataBase.DTO")
@EnableJpaRepositories("tiramisu.DataBase.DAO")
@EnableAsync
@EnableScheduling
@Slf4j
public class TiramisuSpringBootApplication {

  public static final String CORS = "https://angular.tiramisu.localhost/";
  
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
