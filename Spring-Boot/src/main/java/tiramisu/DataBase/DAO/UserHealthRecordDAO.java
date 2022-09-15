package tiramisu.DataBase.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.UserHealthRecord;

@Repository
public interface UserHealthRecordDAO extends JpaRepository<UserHealthRecord, String> {

}