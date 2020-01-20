
package pw.react.carly.status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class StatusService {

    private StatusRepository statusRepository;

    @Autowired
    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public Status updateStatus(Status status){
        if(statusRepository.existsById(status.getId())) {
            statusRepository.save(status);
            return statusRepository.save(status);
        }
        throw new ResourceNotFoundException("Status not found");
    }

    public Status deleteStatus(Status status){
        if(statusRepository.existsById(status.getId())) {
            statusRepository.delete(status);
            return status;
        }
        throw new ResourceNotFoundException("Status not found");
    }

    public Status getStatus(Long id){
        if(statusRepository.existsById(id)) {
            return statusRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Status not found");
    }
}
