package tiramisu.DataBase.DTO;
import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User_Authorization {

  @Id
  @GeneratedValue(strategy=GenerationType.UUID)
  private String userAuthorizationId;
  
  private String token;
  private Instant expireTime;

  @OneToOne(mappedBy = "userAuthorization")
  private User user;
}
