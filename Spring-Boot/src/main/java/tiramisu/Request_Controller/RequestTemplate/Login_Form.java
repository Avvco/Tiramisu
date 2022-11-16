package tiramisu.Request_Controller.RequestTemplate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Login_Form {
  
  private String userName;

  private String idNumber;

  private String password;

  private String type;

}
