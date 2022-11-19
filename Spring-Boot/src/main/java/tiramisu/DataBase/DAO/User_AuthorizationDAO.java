package tiramisu.DataBase.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.User_Authorization;

@Repository
public interface User_AuthorizationDAO extends JpaRepository<User_Authorization, Integer> {
  List<User_Authorization> findByUserAuthorizationId(String userAuthorizationId);
  List<User_Authorization> findByToken(String token);
}