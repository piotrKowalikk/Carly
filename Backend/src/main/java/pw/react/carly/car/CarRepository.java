package pw.react.carly.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pw.react.carly.user.User;

import java.util.List;


public interface CarRepository extends JpaRepository<Car, Long> {

}
