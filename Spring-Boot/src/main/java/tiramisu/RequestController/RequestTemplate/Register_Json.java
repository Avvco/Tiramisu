package tiramisu.RequestController.RequestTemplate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Register_Json {
  @NotEmpty
  @Size(min = 4, max = 40)
  private String userName;

  @NotEmpty
  @Email(message = "Please enter a valid e-mail address", regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
  private String email;

  @NotEmpty
  @Size(min = 6, max = 40)
  private String password;

  @NotEmpty
  private String type;

  @NotEmpty
  @Pattern(regexp = "^0x[0-9a-fA-F]{40}$", message = "Please enter a valid eth address")
  private String ethAddress;

}
