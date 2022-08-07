package tiramisu.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tiramisu.DataBase.DAO.UserDAO;

@Service
public class UserService {
  @Autowired
  private UserDAO userDAO;
}
