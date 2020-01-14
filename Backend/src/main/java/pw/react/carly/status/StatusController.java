package pw.react.carly.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/statuses")
public class StatusController {
    private StatusService statusService;
    private StatusRepository statusRepository;

    @Autowired
    public StatusController(StatusService statusService, StatusRepository statusRepository) {
        this.statusService = statusService;
        this.statusRepository = statusRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Status> getStatus(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(statusService.getStatus(id));
    }
    @GetMapping("")
    public ResponseEntity<List<Status>> getAllStatuses(){
        return ResponseEntity.ok().body(statusRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteStatus(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(statusService.deleteStatus(statusService.getStatus((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Status> updateStatus(@RequestBody @Valid Status Status){
        return ResponseEntity.ok().body(statusService.updateStatus(Status));
    }
    @PutMapping(path = "")
    public ResponseEntity<Status> updateWholeStatus(@RequestBody @Valid Status updatedStatus) {
        return ResponseEntity.ok().body(statusRepository.save(updatedStatus));
    }

    @PostMapping("")
    public ResponseEntity<Status> addStatus(@RequestBody @Valid Status Status) {
            return ResponseEntity.ok().body(statusRepository.save(Status));
    }
}
