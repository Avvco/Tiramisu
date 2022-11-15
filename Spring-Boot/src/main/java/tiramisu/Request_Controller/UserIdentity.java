package tiramisu.Request_Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import tiramisu.DataBase.DAO.UserDAO;
import tiramisu.DataBase.DTO.User;
import tiramisu.Tiramisu.TiramisuSpringBootApplication;

@RestController
@CrossOrigin(TiramisuSpringBootApplication.CORS)
@Slf4j
public class UserIdentity {

  @Autowired
  public UserDAO userDAO;

  @PostMapping("/register")
  public Mono<ResponseEntity<Object>> register(User user) {
    userDAO.save(user);
    return Mono.just(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
  } 

  @PostMapping("/login")
  public String login() {
    return "ok";
  }
}
