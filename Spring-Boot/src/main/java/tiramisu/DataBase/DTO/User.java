package tiramisu.DataBase.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
  private Integer user_id;
  
  private String user_name;
  private String id_number;
  private String email;
  private String type;

}
