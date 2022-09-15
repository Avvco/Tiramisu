package tiramisu.DataBase.DTO;
import jakarta.persistence.Id;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class UserHealthRecord {
  @Id
  private String ID;

  private String name;
}
