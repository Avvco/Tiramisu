package tiramisu.DataBase.DTO;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user_authorization")
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
  @JsonIgnore
  private User user;
}
