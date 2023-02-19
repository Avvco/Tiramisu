package tiramisu.RequestController;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

  @Operation(summary = "Register", description = "Register a new user")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "A new user was created successfully.", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "400", description = "Bad Request", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "409", description = "User already exist", content = {
      @Content()
    })
  })
  @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<ResponseEntity<Void>> register(@Valid @RequestBody Register_Json json) {
    
    userDAO.findByUserNameAndType(json.getUserName(), json.getType()).ifPresent(c -> {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists.");
    });

    User user = common.classMapping(json, User.class);
    user.setHashedPassword(DigestUtils.sha256Hex(json.getPassword()));
    userDAO.save(user);
    
    return Mono.just(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
  } 


  @Operation(summary = "Login", description = "Login as an user")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Login successfully.", content = {
      @Content(mediaType = "application/json", 
      schema = @Schema(implementation = Login_Response.class))
    }),
    @ApiResponse(responseCode = "400", description = "Bad Request", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
      @Content()
    })
  })
  @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<User_Authorization> login(@Valid @RequestBody Login_Json json) throws NoSuchAlgorithmException {
    return userDAO.findByUserNameAndEmailAndType(json.getUserName(), json.getEmail(), json.getType()).map(_user -> {
      // user password incorrect
      if(!_user.getHashedPassword().equals(DigestUtils.sha256Hex(json.getPassword()))) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password incorrect.");
      log.info("User " + _user.getUserName() + " logged in.");
      return Mono.justOrEmpty(Optional.ofNullable(_user.getUserAuthorization())
        .map(ua -> {
          // user has an active authorization
          if(ua.getExpireTime().isAfter(Instant.now())) {
            common.extendAuthorization(ua);
            return ua;
          }
          // user has an expired authorization
          uaDAO.delete(ua);
          return new User_Authorization();
      }).orElseGet(() -> {
          return new User_Authorization();
      }))
      .flatMap(ua -> {
        if(Optional.ofNullable(ua.getToken()).isPresent()) return Mono.just(ua);
        // issue new token
        String _p1 = "";
        try {
          _p1 = String.valueOf(Math.abs(SecureRandom.getInstanceStrong().nextLong()));
        } catch (NoSuchAlgorithmException e) {
          e.printStackTrace();
        }
        _p1 = _p1 + _user.getUserId();

        String sha256hex = DigestUtils.sha256Hex(_p1);
        Instant instantNow = Instant.now();

        //User_Authorization ua = new User_Authorization();
        ua.setToken(sha256hex);
        ua.setExpireTime(instantNow);
        uaDAO.save(ua);
        _user.setUserAuthorization(ua);
        userDAO.save(_user);
        common.extendAuthorization(ua);
        return Mono.just(ua);
      });
    }).orElseGet(() -> {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not exist.");
    });
  }

  @Operation(summary = "Logout", security = @SecurityRequirement(name = "Authorization"))
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "The user was logged out successfully.", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "400", description = "Authorization field is not present in the header.", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
      @Content()
    })
  })
  @GetMapping("/logout")
  public Mono<ResponseEntity<Object>> logout(@Parameter(hidden  = true) @RequestHeader("Authorization") String token) {
    return Mono.justOrEmpty(uaDAO.findByToken(token).map(c -> {
      if(c.getExpireTime().isBefore(Instant.now())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in.");
      }
      c.setExpireTime(Instant.now());
      uaDAO.save(c);
      log.info("User with token " + token + " logged out.");
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }).orElseGet(() -> {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No user found.");
    }));
  }


  @Operation(summary = "Get all etherem wallet address of health workers.", security = @SecurityRequirement(name = "Authorization"))
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "OK.", content = {
      @Content(mediaType = "application/json", 
      schema = @Schema(implementation = Address_Response.class))
    }),
    @ApiResponse(responseCode = "400", description = "Authorization field is not present in the header.", content = {
      @Content()
    }),
    @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
      @Content()
    })
  })
  @GetMapping("/address")
  public Mono<Address_Response> getAddress(@Parameter(hidden  = true) @RequestHeader("Authorization") String token) {
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
