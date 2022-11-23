package tiramisu.DataBase.DTO;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

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
@JsonIgnoreProperties(ignoreUnknown = true)
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
  private UserType type;

  @Column(name="eth_address")
  private String ethAddress;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_authorization", referencedColumnName = "user_authorization_id")
  private User_Authorization userAuthorization;

  public enum UserType {
    @JsonProperty("0")
    HEALTH_WORKER,
    @JsonProperty("1")
    PATIENT;

    private static Map<String, UserType> namesMap = new HashMap<String, UserType>(3);

    static {
      namesMap.put("0", HEALTH_WORKER);
      namesMap.put("1", PATIENT);
    }

    @JsonCreator
    public static UserType forValue(String value) {
      return namesMap.get(StringUtils.lowerCase(value));
    }

    @JsonValue
    public String toValue() {
      for (Entry<String, UserType> entry : namesMap.entrySet()) {
        if (entry.getValue() == this)
          return entry.getKey();
      }
      return null; // or fail
    }

  }
}
