package pw.react.carly.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity(name = "Users")
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String login;
    private String firstName;
    private String lastName;
    private Date birthDate;
    private boolean isActive;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public User(String login) {
        this.login = login;
    }

    public User(String login, String firstName, String lastName, Date birthDate, boolean isActive) {
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.isActive = isActive;
    }
}
