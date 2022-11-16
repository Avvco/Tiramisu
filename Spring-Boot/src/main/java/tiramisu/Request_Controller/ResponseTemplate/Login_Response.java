package tiramisu.Request_Controller.ResponseTemplate;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Login_Response {
  private String userAuthorizationId;
  private String token;
  private Instant expireTime; 
}
