
package pw.react.carly.status;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pw.react.carly.bookingUserInfo.BookingUserInfo;
import pw.react.carly.bookingUserInfo.BookingUserInfoDTO;
import pw.react.carly.bookingUserInfo.BookingUserInfoService;
import pw.react.carly.car.Car;
import pw.react.carly.car.CarDTO;
import pw.react.carly.car.CarService;
import pw.react.carly.reservation.ReservationData;
import pw.react.carly.reservation.ReservationInfo;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static pw.react.carly.status.StatusSpecifications.*;


@Service
public class StatusService {

    private static final ModelMapper mapper = new ModelMapper();
    private StatusRepository statusRepository;
    private CarService carService;
    private BookingUserInfoService bookingUserInfoService;

    @Autowired
    public StatusService(StatusRepository statusRepository, @Lazy CarService carService, BookingUserInfoService bookingUserInfoService) {
        this.carService = carService;
        this.statusRepository = statusRepository;
        this.bookingUserInfoService = bookingUserInfoService;
    }

    public ReservationInfo getReservation(Long statusID){
        Status status = getStatus(statusID);

        CarDTO carDTO = mapper.map(status.getCar(),CarDTO.class);
        return new ReservationInfo(carDTO,status.getDateFrom(),status.getDateTo());
    }

    public Status saveReservation(ReservationData reservationData){
        long carId = reservationData.getCarId();
        Car car = carService.getCar(carId);
        if(!checkIfCorrectDate(reservationData.getFromDate(),reservationData.getToDate()))
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Wrong date");

        if(!carService.checkIfAvailable(car,reservationData.getFromDate(), reservationData.getToDate()))
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Car is not available or does not exist.");

        BookingUserInfoDTO bookingUserInfoDTO = new BookingUserInfoDTO(reservationData.getName(),reservationData.getSurname(),reservationData.getEmail());
        BookingUserInfo bookingUserInfo = bookingUserInfoService.addBookingUserInfo(bookingUserInfoDTO);
        Status status = new Status();
        status.setCar(car);
        status.setBookingUserInfo(bookingUserInfo);
        status.setDateFrom(reservationData.getFromDate());
        status.setDateTo(reservationData.getToDate());
        status.setType(StatusType.BOOKED);
        status.setComment("Bookly reservation");

        return statusRepository.save(status);
    }
    public Status updateStatus(Status status){
        if(statusRepository.existsById(status.getId())) {
            return statusRepository.save(status);
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Status not found.");
    }
    private boolean checkIfCorrectDate(Date from,Date to){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, (-5));
        Date currentDateToCompare = cal.getTime();
        if(from.before(currentDateToCompare) || from.after(to))
                    return false;
        return true;
    }
    public List<Status> findCollidingBookedStatuses(Date from, Date to, long carId){
       return statusRepository.findAll(collidesWithDateSpan(from,to).and(byCarId(carId).and(isType(StatusType.BOOKED))));
    }
    private List<Status> changeToBookedType(List<Status> statuses){
        for (Status s: statuses
        ) {
            s.setType(StatusType.BOOKINGCANCELED);
        }
        return statuses;
    }

    private Iterable<Status> saveAll(List<Status> statuses){
        return statusRepository.saveAll(statuses);
    }

    private void cancelCollidingReservations(Date from, Date to, long carId){
        List<Status> statusesWhichCollidesWithNewOne = findCollidingBookedStatuses(from,to,carId);
        if(!statusesWhichCollidesWithNewOne.isEmpty()) {
            changeToBookedType(statusesWhichCollidesWithNewOne);
            saveAll(statusesWhichCollidesWithNewOne);
        }
    }

    private Status createUnavailableStatus(StatusDTO statusDTO){
        Car car = carService.getCar(statusDTO.getCarId());
        Status status = new Status();
        mapper.map(statusDTO,status);
        status.setId(null);
        status.setType(StatusType.UNAVAILABLE);
        status.setCar(car);
        return status;
    }

    public Status saveUnavailableStatus(StatusDTO statusDTO){
        Date from  = statusDTO.getDateFrom();
        Date to = statusDTO.getDateTo();

        if(!checkIfCorrectDate(from,to))
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Wrong date");

        cancelCollidingReservations(from,to,statusDTO.getCarId());
        Status status = createUnavailableStatus(statusDTO);

        return statusRepository.save(status);
    }
    public boolean cancelReservation(Long id){
        Status status = getStatus(id);
        status.setType(StatusType.BOOKINGCANCELED);
        statusRepository.save(status);
        return true;
    }

    public Status deleteStatus(Status status){
        if(statusRepository.existsById(status.getId())) {
            return status;
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Status not found.");
    }

    public Status getStatus(Long id){
        if(statusRepository.existsById(id)) {
            return statusRepository.findById(id).get();
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Status not found.");
    }
}
