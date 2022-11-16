package tiramisu.Request_Controller.RequestTemplate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Register_Form {
  @NotEmpty
  @Size(min = 4, max = 40)
  private String userName;

  @NotEmpty
  private String idNumber;

  @NotEmpty
  @Email(message = "Please enter a valid e-mail address")
  private String email;

  @NotEmpty
  @Size(min = 6, max = 40)
  private String password;

  @NotEmpty
  private String type;

}
