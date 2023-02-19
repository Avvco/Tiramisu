package tiramisu.DataBase.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import tiramisu.DataBase.DTO.User_Authorization;

@Component
public interface User_AuthorizationDAO extends JpaRepository<User_Authorization, Integer> {
  Optional<User_Authorization> findByUserAuthorizationId(String userAuthorizationId);
  Optional<User_Authorization> findByToken(String token);
}