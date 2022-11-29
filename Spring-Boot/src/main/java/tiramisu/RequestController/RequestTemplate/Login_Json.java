package tiramisu.RequestController.RequestTemplate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tiramisu.DataBase.DTO.User;

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

  @NotNull
  private User.UserType type;

}
