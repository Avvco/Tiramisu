package tiramisu.Request_Controller;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import tiramisu.DataBase.DAO.UserDAO;
import tiramisu.DataBase.DAO.User_AuthorizationDAO;
import tiramisu.DataBase.DTO.User;
import tiramisu.DataBase.DTO.User_Authorization;
import tiramisu.Request_Controller.RequestTemplate.Login_Form;
import tiramisu.Request_Controller.RequestTemplate.Register_Form;
import tiramisu.Request_Controller.ResponseTemplate.Login_Response;
import tiramisu.Tiramisu.TiramisuSpringBootApplication;

@RestController
@CrossOrigin(TiramisuSpringBootApplication.CORS)
@Slf4j
public class UserIdentity {
  
  @Autowired
  private UserDAO userDAO;

  @Autowired
  private User_AuthorizationDAO uaDAO;

  @PostMapping("/register")
  public Mono<ResponseEntity<Object>> register(@Valid Register_Form form) {

    if(form.getType().equals("0")) {
      log.info("Registering a health worker " + form.getUserName());
    } else if(form.getType().equals("1")) {
      log.info("Registering a user " + form.getUserName());
    } else {
      log.error("Invalid user type ");
      return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    User user = new User();
    user.setUserName(form.getUserName());
    user.setIdNumber(form.getIdNumber());
    user.setEmail(form.getEmail());
    user.setType(form.getType());
    user.setHashedPassword(DigestUtils.sha256Hex(form.getPassword()));
    
    userDAO.save(user);
    
    return Mono.just(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
  } 

  @PostMapping("/login")
  public Mono<ResponseEntity<Object>> login(Login_Form form) throws NoSuchAlgorithmException {

    List<User> foundUser = userDAO.findByUserNameAndIdNumberAndType(form.getUserName(), form.getIdNumber(), form.getType());

    // user not found in database
    if(foundUser.size() == 0) return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    if(foundUser.size() > 1) return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Multiple user found."));

    User _user = foundUser.get(0);

    if(!_user.getHashedPassword().equals(DigestUtils.sha256Hex(form.getPassword()))) return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());

    log.info("User " + _user.getUserName() + " logged in.");

    // prevent when first time login, the user authorization is not created.
    if(_user.getUserAuthorization() != null) {
      // check if user has an active authorization
      List<User_Authorization> foundUa = uaDAO.findByUserAuthorizationId(_user.getUserAuthorization().getUserAuthorizationId());
      if(foundUa.size() > 0) {
        User_Authorization _ua = foundUa.get(0);
        if(_ua.getExpireTime().isAfter(Instant.now())) {
          // user has an active authorization
          extendAuthorization(_ua);
          return Mono.just(ResponseEntity.status(HttpStatus.OK).body(new Login_Response(_ua.getUserAuthorizationId(), _ua.getToken(), _ua.getExpireTime())));
        }
        uaDAO.delete(_ua);
      }
    }
    
    // calculate new hash
    String _p1 = String.valueOf(Math.abs(SecureRandom.getInstanceStrong().nextLong()));
    _p1 = _p1 + _user.getUserName() + _user.getIdNumber();
    
    String sha256hex = DigestUtils.sha256Hex(_p1);

    Instant instantNow = Instant.now();

    User_Authorization ua = new User_Authorization();
    ua.setToken(sha256hex);
    ua.setExpireTime(instantNow);
    uaDAO.save(ua);
    _user.setUserAuthorization(ua);
    userDAO.save(_user);
    extendAuthorization(ua);
    return Mono.just(ResponseEntity.ok(new Login_Response(ua.getUserAuthorizationId(), ua.getToken(), ua.getExpireTime())));
  }

  @GetMapping("/logout")
  public Mono<ResponseEntity<Object>> logout(@RequestHeader("Authorization") String token) {
    log.info("User with token " + token + " logged out.");
    List<User_Authorization> foundUa = uaDAO.findByToken(token);
    if(foundUa.size() > 0) {
      User_Authorization _ua = foundUa.get(0);
      _ua.setExpireTime(Instant.now());
      uaDAO.save(_ua);
      return Mono.just(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }
    return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  } 

  public void extendAuthorization(User_Authorization ua) {
    Instant instantNow = Instant.now();
    Instant instantExpire = instantNow.plus(5, ChronoUnit.MINUTES);
    ua.setExpireTime(instantExpire);
    uaDAO.save(ua);
  }
}
