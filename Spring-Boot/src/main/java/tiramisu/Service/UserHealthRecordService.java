package tiramisu.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tiramisu.DataBase.DAO.UserHealthRecordDAO;

@Service
public class UserHealthRecordService {
  @Autowired
  UserHealthRecordDAO userHealthRecordDAO;
}
