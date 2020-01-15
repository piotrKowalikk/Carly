package pw.react.carly.status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface StatusRepository extends JpaRepository<Status, Long>, JpaSpecificationExecutor<Status> {

}
