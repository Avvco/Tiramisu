package tiramisu.DataBase.DAO;


import org.springframework.data.jpa.repository.JpaRepository;

import tiramisu.DataBase.DTO.User;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
public interface IUserRepository extends JpaRepository<User, Integer> {

}
 