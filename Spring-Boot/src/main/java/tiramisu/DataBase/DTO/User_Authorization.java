package tiramisu.DataBase.DTO;
import java.time.Instant;

import jakarta.persistence.Column;
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
  @Column(name="user_authorization_id")
  private String userAuthorizationId;
  
  @Column(name="token")
  private String token;

  @Column(name="expire_time")
  private Instant expireTime;

  @OneToOne(mappedBy = "userAuthorization")
  private User user;
}
