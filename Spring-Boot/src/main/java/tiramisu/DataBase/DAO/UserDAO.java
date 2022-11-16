package tiramisu.DataBase.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.User;
import tiramisu.DataBase.DTO.User_Authorization;

// https://www.bezkoder.com/jpa-repository-query/

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
  List<User> findByUserNameAndEmailAndType(String userName, String email, String type);
  List<User> findByUserAuthorization(User_Authorization userAuthorization);
}
