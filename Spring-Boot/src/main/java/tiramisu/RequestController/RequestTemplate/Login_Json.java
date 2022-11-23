package tiramisu.RequestController.RequestTemplate;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Login_Json {
  
  @NotEmpty
  private String userName;

  @NotEmpty
  private String email;

  @NotEmpty
  private String password;

  @NotEmpty
  private String type;

}
