package tiramisu.DataBase.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.User;

// https://www.bezkoder.com/jpa-repository-query/

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {
  List<User> findByUserNameAndIdNumberAndType(String userName, String idNumber, String type); 
}
