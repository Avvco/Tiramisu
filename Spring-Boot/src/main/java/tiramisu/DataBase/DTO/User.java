package tiramisu.DataBase.DTO;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
  @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
  private Integer user_id;
  
  private String user_name;
  private String id_number;
  private Date birthday;
  private Date register_date;

  public Integer getUser_id() {
    return user_id;
  }
  public String getUser_name() {
    return user_name;
  }
  public void setUser_name(String user_name) {
    this.user_name = user_name;
  }
  public String getId_number() {
    return id_number;
  }
  public void setId_number(String id_number) {
    this.id_number = id_number;
  }
  public Date getBirthday() {
    return birthday;
  }
  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }
  public Date getRegister_date() {
    return register_date;
  }
  public void setRegister_date(Date register_date) {
    this.register_date = register_date;
  }
}
