package pw.react.carly.car;

import org.springframework.data.jpa.domain.Specification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor {

}
