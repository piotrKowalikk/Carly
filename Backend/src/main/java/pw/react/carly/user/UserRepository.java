package pw.react.carly.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM Users u WHERE u.login=:login")
    List<User> findByLogin(@Param("login") String login);

}
