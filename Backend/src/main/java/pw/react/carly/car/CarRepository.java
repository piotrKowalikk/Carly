package pw.react.carly.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.List;


public interface CarRepository extends JpaRepository<Car, Long>, JpaSpecificationExecutor {
    List<Car> findByIdNotIn(Collection<Long> ids);
}
