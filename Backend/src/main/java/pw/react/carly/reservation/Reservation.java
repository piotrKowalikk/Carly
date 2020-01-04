package pw.react.carly.reservation;
import pw.react.carly.car.Car;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Reservations")
@Table(name = "Reservations")
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;
    private Date reservationDate;
    private Date expirationDate;
    private String email;
    @ManyToOne(fetch=FetchType.EAGER)
    private Car car;


    public Reservation() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }
}
