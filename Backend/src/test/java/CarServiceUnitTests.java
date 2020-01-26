import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;
import pw.react.carly.CarlyApplication;
import pw.react.carly.bookingUserInfo.BookingUserInfo;
import pw.react.carly.car.Car;
import pw.react.carly.car.CarRepository;
import pw.react.carly.status.Status;
import pw.react.carly.status.StatusRepository;
import pw.react.carly.status.StatusType;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static pw.react.carly.car.CarSpecification.isNotDeniedByStatuses;

@RunWith(SpringRunner.class)
@Transactional
@SpringBootTest(classes = CarlyApplication.class, properties = {"spring.datasource.initialization-mode=never"})
public class CarServiceUnitTests {


    @Autowired
    private CarRepository carRepository;
    @Autowired
    StatusRepository statusRepository;

    @Before
    public void init(){
        statusRepository.deleteAll();
        carRepository.deleteAll();

        List<Car> cars = new ArrayList<>();
        for(int i = 0 ; i < 10 ; i++) {
            Car car = new Car("Model" + i, "Make" + i, 5, 2019, "WWA333" + i, "Location " + i, new BigDecimal(200 + 10 * i));
            cars.add(car);
        }
        carRepository.saveAll(cars);

        BookingUserInfo bookingUserInfo = new BookingUserInfo("test","test","email@email.com");
        int statusAmount = 30;
        for(int j = 0 ; j < statusAmount ; j++){

            Calendar cal =Calendar.getInstance();
            Date from = cal.getTime();
            cal.add(Calendar.DATE,j);
            Date to = cal.getTime();
            StatusType type;

            type = j % 2 ==0 ? StatusType.BOOKED : StatusType.UNAVAILABLE;

            if(j % 6 == 0)
                type= StatusType.BOOKINGCANCELED;
            Status status = new Status(cars.get(j % cars.size()), bookingUserInfo, null, null,from , to,type);
            statusRepository.save(status);
        }
    }


    @Test
    public void isNotDeniedByStatusesSpec_givenListOfStatuses_returnsAvailableCars() throws Exception {
        List<Status> statuses = new ArrayList<Status>();
        List<Car> cars = (List<Car>) carRepository.findAll();
        BookingUserInfo bookingUserInfo = new BookingUserInfo("test","test","email@email.com");
        int statusAmount = 10;

        for(int j = 0 ; j < 10 ; j++){
            Calendar cal =Calendar.getInstance();

            cal.add(Calendar.DATE,j);
            Date from = cal.getTime();
            cal.add(Calendar.DATE,j+1);
            Date to = cal.getTime();

            StatusType type;
            type = j % 2 ==0 ? StatusType.BOOKED : StatusType.UNAVAILABLE;
            Status status = new Status(cars.get(j % (cars.size()/2)), bookingUserInfo, null, null,from , to,type);
            statuses.add(status);
        }


        Specification<Car> spec = isNotDeniedByStatuses(statuses);
        Iterable<Car> specCars = carRepository.findAll(spec);
        for(Car specCar : specCars){
            for(Status status : statuses) {
                assertEquals( false,status.getCar().equals(specCar));
            }
            cars.remove(specCar);
        }
        List<Car> deniedCars = cars;
        boolean wasFound;

        for(Car car : deniedCars){
            wasFound = false;
            for(Status status : statuses) {
                if(status.getCar().equals(car))
                    wasFound = true;
            }
            assertEquals(true,wasFound);
        }
    }

}
