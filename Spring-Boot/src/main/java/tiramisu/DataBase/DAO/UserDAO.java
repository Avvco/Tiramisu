package tiramisu.DataBase.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import tiramisu.DataBase.DTO.User;
import tiramisu.DataBase.DTO.User.UserType;
import tiramisu.DataBase.DTO.User_Authorization;

// https://www.bezkoder.com/jpa-repository-query/

@Component
public interface UserDAO extends JpaRepository<User, Integer> {
  List<User> findByUserNameAndEmailAndType(String userName, String email, UserType type);
  List<User> findByUserAuthorization(User_Authorization userAuthorization);
  List<User> findByType(UserType type);
  Optional<User> findByUserNameAndType(String userName, UserType type);
}
