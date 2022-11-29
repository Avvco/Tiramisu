package tiramisu.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import tiramisu.DataBase.DAO.UserDAO;
import tiramisu.DataBase.DAO.User_AuthorizationDAO;
import tiramisu.DataBase.DTO.User;
import tiramisu.DataBase.DTO.User_Authorization;
import tiramisu.RequestController.Common;

@Service
@Slf4j
public class Permission_Control_Service {

  @Autowired
  private UserDAO userDAO;

  @Autowired
  private User_AuthorizationDAO uaDAO;

  @Autowired
  private Common common;

  private PermissionTableList permissionList = new PermissionTableList();
  
  /**
   * Control the permission of user that is elegible to access the route.
   * @param header
   * @param method
   * @param url
   * @return
   */
  public boolean pre_permissionControl(Map<String, String> header, String method, String url) {
    
    String token = header.get("Authorization");

    return pre_permissionControl(token, method, url);
    
  }

  public boolean pre_permissionControl(String token, String method, String url) {
    if(!requireForPrePermission(method, url)) return true;

    List<User_Authorization> foundUa = uaDAO.findByToken(token);
    User user = null;

    // check authorization token
    if(foundUa.size() > 0) {
      User_Authorization _ua = foundUa.get(0);
      if(_ua.getExpireTime().isAfter(Instant.now())) {
        // user has an active authorization
        common.extendAuthorization(_ua);
        List<User> foundUser = userDAO.findByUserAuthorization(_ua);
        user = foundUser.get(0);
      } else {
        return false;
      }
    }else {
      return false;
    } 
    
    if(user.getType().equals(User.UserType.HEALTH_WORKER)) return true;
    return false;
  }

  /**
   * Control the permission of user that is elegible to access the return data.
   * @param header
   * @param method
   * @param url
   * @return
   */
  public boolean after_permissionControl(Map<String, String> header, String method, String url) {
    return true;

    
  }

  private boolean requireForPrePermission(String method, String url) {
    for(PermissionTableList.PermissionTable permission : permissionList.getPermissionTable()) {
      if(permission.getMethod().equals(method) && permission.isOnly_medical_staff() && url.startsWith(permission.getRoute())) {
        return true;
      }
    }
    return false;
  }


  /**
   * Read the permission table from the file.
   */
  @Bean
  public boolean setPermissions() throws JsonMappingException, JsonProcessingException {
    log.info("Setting route permissions ...");
    ObjectMapper mapper = new ObjectMapper();

    permissionList = mapper.readValue(getResourceFileAsString("routePermission.json"), PermissionTableList.class);
    return true;
  }

  private String getResourceFileAsString(String fileName) {
    InputStream is = getResourceFileAsInputStream(fileName);
    if (is != null) {
      BufferedReader reader = new BufferedReader(new InputStreamReader(is));
      return (String) reader.lines().collect(Collectors.joining(System.lineSeparator()));
    } else {
      throw new RuntimeException("resource not found");
    }
  }

  private InputStream getResourceFileAsInputStream(String fileName) {
    ClassLoader classLoader = Permission_Control_Service.class.getClassLoader();
    return classLoader.getResourceAsStream(fileName);
  }
}
