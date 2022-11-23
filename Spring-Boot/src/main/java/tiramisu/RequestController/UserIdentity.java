package tiramisu.RequestController;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import tiramisu.DataBase.DAO.UserDAO;
import tiramisu.DataBase.DAO.User_AuthorizationDAO;
import tiramisu.DataBase.DTO.User;
import tiramisu.DataBase.DTO.User_Authorization;
import tiramisu.RequestController.RequestTemplate.Login_Json;
import tiramisu.RequestController.RequestTemplate.Register_Json;
import tiramisu.RequestController.ResponseTemplate.Address_Response;
import tiramisu.RequestController.ResponseTemplate.Login_Response;
import tiramisu.Service.Permission_Control_Service;
import tiramisu.Tiramisu.TiramisuSpringBootApplication;

@RestController
@CrossOrigin(TiramisuSpringBootApplication.CORS)
@Slf4j
public class UserIdentity {
  
  @Autowired
  private UserDAO userDAO;

  @Autowired
  private User_AuthorizationDAO uaDAO;

  @Autowired
  private Common common;

  @Autowired
  private Permission_Control_Service pcs;

  @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<Void>> register(@Valid @RequestBody Register_Json json) {

    if(json.getType().equals("0")) {
      log.info("Registering a health worker " + json.getUserName());
    } else if(json.getType().equals("1")) {
      log.info("Registering a user " + json.getUserName());
    } else {
      log.error("Invalid user type ");
      return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
    User user = common.classMapping(json, User.class);
    user.setHashedPassword(DigestUtils.sha256Hex(json.getPassword()));
    
    userDAO.save(user);
    
    return Mono.just(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
  } 

  @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<Login_Response> login(@Valid @RequestBody Login_Json json) throws NoSuchAlgorithmException {

    List<User> foundUser = userDAO.findByUserNameAndEmailAndType(json.getUserName(), json.getEmail(), User.UserType.forValue(json.getType()));

    // user not found in database
    if(foundUser.size() == 0) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    if(foundUser.size() > 1) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Multiple user found");

    User _user = foundUser.get(0);

    if(!_user.getHashedPassword().equals(DigestUtils.sha256Hex(json.getPassword()))) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

    log.info("User " + _user.getUserName() + " logged in.");

    // prevent when first time login, the user authorization is not created.
    if(_user.getUserAuthorization() != null) {
      // check if user has an active authorization
      List<User_Authorization> foundUa = uaDAO.findByUserAuthorizationId(_user.getUserAuthorization().getUserAuthorizationId());
      if(foundUa.size() > 0) {
        User_Authorization _ua = foundUa.get(0);
        if(_ua.getExpireTime().isAfter(Instant.now())) {
          // user has an active authorization
          common.extendAuthorization(_ua);
          return Mono.just(common.classMapping(_ua, Login_Response.class));
        }
        uaDAO.delete(_ua);
      }
    }
    
    // calculate new hash
    String _p1 = String.valueOf(Math.abs(SecureRandom.getInstanceStrong().nextLong()));
    //_p1 = _p1 + _user.getUserName() + _user.getIdNumber();
    _p1 = _p1 + _user.getUserName();
    
    String sha256hex = DigestUtils.sha256Hex(_p1);

    Instant instantNow = Instant.now();

    User_Authorization ua = new User_Authorization();
    ua.setToken(sha256hex);
    ua.setExpireTime(instantNow);
    uaDAO.save(ua);
    _user.setUserAuthorization(ua);
    userDAO.save(_user);
    common.extendAuthorization(ua);
    return Mono.just(common.classMapping(ua, Login_Response.class));
  }

  @GetMapping("/logout")
  public Mono<ResponseEntity<Object>> logout(@Parameter(description = "id of book to be searched") @RequestHeader("Authorization") String token) {
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

  @GetMapping("/address")
  public Mono<Address_Response> getAddress(@Parameter(description = "Authorization header") @RequestHeader("Authorization") String token) {
    if(!pcs.pre_permissionControl(token, "GET", "/address")) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Access denied");
    }
    ArrayList<String> arList = new ArrayList<String>();
    List<User> foundUser = userDAO.findByType(User.UserType.HEALTH_WORKER);
    for(User u : foundUser) {
      arList.add(u.getEthAddress());
    }
    return Mono.just(new Address_Response(arList));
  }


  @Bean
  @Scheduled(fixedDelay=600000)
  @Async
  // this method will remove the unassociated expired authorization.
  public void removeExpiredAuthorization() {
    List<User_Authorization> foundUa = uaDAO.findAll(); 
    for(User_Authorization ua : foundUa) {
      if(ua.getExpireTime().isBefore(Instant.now())) {
        uaDAO.delete(ua);
      }
    }
    log.info("Expired authorization removed.");
  }
}
