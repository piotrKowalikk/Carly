package pw.react.carly.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.carly.status.StatusService;

import javax.validation.constraints.NotNull;


@RestController
@RequestMapping("/reservations")
public class ReservationsController {
    private StatusService statusService;

    @Autowired
    public ReservationsController(StatusService statusService) {
        this.statusService = statusService;

    }

    @GetMapping("/{id}")
    public ResponseEntity GetReservation(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(statusService.getReservation(id));
    }

    @PostMapping
    public ResponseEntity PostReservation(@RequestBody @NotNull ReservationData reservationData){
        return ResponseEntity.ok().body(statusService.saveReservation(reservationData).getId());
    }
}
