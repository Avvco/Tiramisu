package tiramisu.Request_Controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import tiramisu.DataBase.DAO.User_AuthorizationDAO;
import tiramisu.DataBase.DTO.User_Authorization;

@Component
public class Common {

  @Autowired
  private User_AuthorizationDAO uaDAO;

  public void extendAuthorization(User_Authorization ua) {
    Instant instantNow = Instant.now();
    Instant instantExpire = instantNow.plus(5, ChronoUnit.MINUTES);
    ua.setExpireTime(instantExpire);
    uaDAO.save(ua);
  }

  public <E> void jsonValidator(Class<E> cls, E obj) {
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();
    Set<ConstraintViolation<E>> violations = validator.validate(obj);
    if (!violations.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, violations.toString());
    }
  }
}
