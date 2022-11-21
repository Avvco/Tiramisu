package tiramisu.DataBase.DTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
  @Column(name="user_id")
  private Integer userId;

  @Column(name="user_name")
  private String userName;

  @Column(name="email")
  private String email;

  @Column(name="hashed_password")
  private String hashedPassword;
  
  /**
   * Type of user:
   * 0: Health worker
   * 1: User
   */
  @Column(name="type")
  private String type;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_authorization", referencedColumnName = "user_authorization_id")
  private User_Authorization userAuthorization;

}
