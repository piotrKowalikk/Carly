package pw.react.carly.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private ReservationService reservationService;
    private ReservationRepository reservationRepository;

    @Autowired
    public ReservationController(ReservationService reservationService, ReservationRepository reservationRepository) {
        this.reservationService = reservationService;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservation(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(reservationService.getReservation(id));
    }
    @GetMapping("")
    public ResponseEntity<List<Reservation>> getAllReservations(){
        return ResponseEntity.ok().body(reservationRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteReservation(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(reservationService.deleteReservation(reservationService.getReservation((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Reservation> updateReservation(@RequestBody @Valid Reservation Reservation){
        return ResponseEntity.ok().body(reservationService.updateReservation(Reservation));
    }
    @PutMapping(path = "")
    public ResponseEntity<Reservation> updateWholeReservation(@RequestBody @Valid Reservation updatedReservation) {
        return ResponseEntity.ok().body(reservationRepository.save(updatedReservation));
    }

    @PostMapping("")
    public ResponseEntity<Reservation> addReservation(@RequestBody @Valid Reservation Reservation) {
            return ResponseEntity.ok().body(reservationRepository.save(Reservation));
    }
}
