package tiramisu.RequestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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

  private ObjectMapper mapper = new ObjectMapper();

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

  /**
   * Convert a class object to another class object and fill with the same-name value.
   * @param <T> The class object to convert from.
   * @param <E> The class object to convert to.
   * @param resource The class object to convert from.
   * @param target The class object to convert to.
   * @return The converted class object.
   */
  public <T, E> E classMapping(T resource, Class<E> target) {
    try {
      return mapper.readValue(mapper.writeValueAsString(resource), target);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return null;
  }
}
