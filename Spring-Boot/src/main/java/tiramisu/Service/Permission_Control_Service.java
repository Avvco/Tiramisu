package tiramisu.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
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

@Service
@Slf4j
public class Permission_Control_Service {

  @Autowired
  private UserDAO userDAO;

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
    log.info(url);
    /*for(PermissionTableList.PermissionTable permission : permissionList.getPermissionTable()) {
      log.info(permission.toString());
    }*/
    return true;
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
