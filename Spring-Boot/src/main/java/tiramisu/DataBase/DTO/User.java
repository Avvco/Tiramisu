package tiramisu.DataBase.DTO;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
  @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
  private Integer user_id;
  
  private String user_name;
  private String id_number;
  private Date birthday;
  private Date register_date;

}
