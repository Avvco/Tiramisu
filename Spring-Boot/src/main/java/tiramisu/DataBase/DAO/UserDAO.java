package tiramisu.DataBase.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.User;

@Repository
public interface UserDAO extends JpaRepository<User, Integer> {

}
