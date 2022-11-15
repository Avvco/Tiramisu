package tiramisu.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tiramisu.DataBase.DAO.UserDAO;

@Service
public class Permission_Control_Service {

  @Autowired
  public UserDAO userDAO;
  
  public boolean permissionControl() {
    return true;
  }
}
