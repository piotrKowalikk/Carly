
package pw.react.carly.status;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import pw.react.carly.bookingUserInfo.BookingUserInfo;
import pw.react.carly.bookingUserInfo.BookingUserInfoDTO;
import pw.react.carly.bookingUserInfo.BookingUserInfoService;
import pw.react.carly.car.Car;
import pw.react.carly.car.CarDTO;
import pw.react.carly.car.CarService;
import pw.react.carly.reservation.ReservationData;
import pw.react.carly.reservation.ReservationInfo;


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
        if(!carService.checkIfAvailable(car,reservationData.getFromDate(), reservationData.getToDate()))
            throw new ResourceNotFoundException("Auto niedostepne");

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
