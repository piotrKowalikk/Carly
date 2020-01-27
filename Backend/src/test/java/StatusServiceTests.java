import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.server.ResponseStatusException;
import pw.react.carly.car.Car;
import pw.react.carly.car.CarService;
import pw.react.carly.reservation.ReservationData;
import pw.react.carly.status.StatusRepository;
import pw.react.carly.status.StatusService;

import java.util.Calendar;
import java.util.Date;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class StatusServiceTests {
    @Mock
    StatusRepository statusRepository;

    @Mock
    CarService carService;

    @InjectMocks
    private StatusService statusService;


    @Rule
    public final ExpectedException expectedException = ExpectedException.none();




    @Test
    public void saveReservation_givenReservationWithFromDateBeforeCurrentDate_throwsBadRequest(){
        //Create reservation with date before current date
        Car car = new Car();
        car.setId(3l);
        ReservationData reservationData = new ReservationData();
        reservationData.setCarId(car.getId());
        Calendar cal  = Calendar.getInstance();
        cal.add(Calendar.DATE,(-1));
        System.out.println(cal.getTime());
        Date badDate = cal.getTime();

        reservationData.setFromDate(badDate);
        when(carService.getCar(car.getId())).thenReturn(car);

        expectedException.expect(ResponseStatusException.class);
        expectedException.expectMessage("400 BAD_REQUEST \"Wrong date\"");

        statusService.saveReservation(reservationData);
    }
    @Test
    public void saveReservation_givenReservationWithUnavailableCar_throwsNotFound(){
        Car car = new Car();
        car.setId(3l);
        ReservationData reservationData = new ReservationData();
        reservationData.setCarId(car.getId());
        Calendar cal  = Calendar.getInstance();
        cal.add(Calendar.DATE,(1));
        System.out.println(cal.getTime());
        Date badDate = cal.getTime();

        reservationData.setFromDate(badDate);
        when(carService.getCar(car.getId())).thenReturn(car);
        when(carService.checkIfAvailable(car,reservationData.getFromDate(), reservationData.getToDate())).thenReturn(false);

        expectedException.expect(ResponseStatusException.class);
        expectedException.expectMessage("404 NOT_FOUND \"Car is not available or does not exist.\"");

        statusService.saveReservation(reservationData);
    }
}
