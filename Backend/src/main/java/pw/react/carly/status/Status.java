package pw.react.carly.status;

import pw.react.carly.car.Car;
import pw.react.carly.bookingUserInfo.BookingUserInfo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Car car;
    @ManyToOne
    private BookingUserInfo bookingUserInfo;
    private String comment;

    private Date dateFrom;
    private Date dateTo;
    @Enumerated(EnumType.STRING)
    private StatusType type;


    public Status() {
    }


    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public BookingUserInfo getBookingUserInfo() {
        return bookingUserInfo;
    }

    public void setBookingUserInfo(BookingUserInfo bookingUserInfo) {
        this.bookingUserInfo = bookingUserInfo;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public StatusType getType() {
        return type;
    }

    public void setType(StatusType type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }


}
