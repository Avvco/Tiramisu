package tiramisu.Configuration;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;


@Configuration
@OpenAPIDefinition(info = @Info(title = "Tiramisu Spring Boot API Documentation", version = "1.0.0"))
@SecurityScheme(
    name = "Authorization",
    type = SecuritySchemeType.APIKEY,
    // bearerFormat = "JWT",
    // scheme = "auth",
    in = SecuritySchemeIn.HEADER
)
public class SwaggerConfiguration {
  
}
