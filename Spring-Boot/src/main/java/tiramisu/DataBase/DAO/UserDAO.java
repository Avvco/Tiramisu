package tiramisu.DataBase.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDAO {
  @Autowired
	UserRepository userRepository;
}
