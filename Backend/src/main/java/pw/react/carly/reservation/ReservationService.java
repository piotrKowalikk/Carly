
package pw.react.carly.reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class ReservationService {

    private ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation updateReservation(Reservation reservation){
        if(reservationRepository.existsById(reservation.getId())) {
            reservationRepository.save(reservation);
            return reservationRepository.save(reservation);
        }
        throw new ResourceNotFoundException("Reservation not found");
    }

    public Reservation deleteReservation(Reservation reservation){
        if(reservationRepository.existsById(reservation.getId())) {
            reservationRepository.delete(reservation);
            return reservation;
        }
        throw new ResourceNotFoundException("Reservation not found");
    }

    public Reservation getReservation(Long id){
        if(reservationRepository.existsById(id)) {
            return reservationRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Reservation not found");
    }
}
