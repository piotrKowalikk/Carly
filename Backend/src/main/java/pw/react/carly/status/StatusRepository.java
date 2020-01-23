package pw.react.carly.status;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface StatusRepository extends PagingAndSortingRepository<Status, Long>, JpaSpecificationExecutor<Status> {

}
