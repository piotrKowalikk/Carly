package pw.react.carly.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.Date;
import java.util.List;

import static pw.react.carly.status.StatusSpecifications.*;

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
    public ResponseEntity<List<Status>> getStatuses(

            @RequestParam(name="from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
            @RequestParam(name="to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to,
            @RequestParam(name="type",required = false) StatusType type,
            @RequestParam(name="carID",required = false) Long carID
    ){
        Specification<Status> spec = Specification.where(null);
        if(from != null)
            spec = spec.and(fromDateBefore(from));
        if(to != null)
            spec = spec.and(toDateAfter(to));
        if(type != null)
            spec = spec.and(isType(type));
        if(carID != null)
            spec = spec.and(getStatusesByCarId(carID));

        return ResponseEntity.ok().body(statusRepository.findAll(spec));
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
