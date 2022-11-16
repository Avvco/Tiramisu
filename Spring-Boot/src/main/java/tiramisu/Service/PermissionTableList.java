package tiramisu.Service;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionTableList implements Serializable {
  @JsonProperty(value = "permissionTable")
  private ArrayList<PermissionTable> permissionTable;
  

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class PermissionTable implements Serializable {
    @JsonProperty(value = "route")
    private String route;

    @JsonProperty(value = "method")
    private String method;

    @JsonProperty(value = "only_medical_staff")
    private boolean only_medical_staff;

    @JsonProperty(value = "only_itself")
    private boolean only_itself;
  }
}
