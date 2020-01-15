package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import pw.react.carly.exceptions.WrongDateSpanException;
import pw.react.carly.status.Status;
import pw.react.carly.status.StatusRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static pw.react.carly.status.StatusSpecifications.colidesWithDateSpan;
import static pw.react.carly.status.StatusSpecifications.isUnavailableOrBooked;


@Service
public class CarService {

    private StatusRepository statusRepository;
    private CarRepository carRepository;

    @Autowired
    public CarService(StatusRepository statusRepository, CarRepository carRepository) {
        this.statusRepository = statusRepository;
        this.carRepository = carRepository;
    }

    public Car updateCar(Car car){
        if(carRepository.existsById(car.getId())) {
            carRepository.save(car);
            return carRepository.save(car);
        }
        throw new ResourceNotFoundException("Car not found");
    }

    public Car deleteCar(Car car){
        if(carRepository.existsById(car.getId())) {
            carRepository.delete(car);
            return car;
        }
        throw new ResourceNotFoundException("Car not found");
    }
        //TODO testy, na paru prostych przykladach dziala, idk czy uwzglednia wszystko
    public List<Car> findAvailableCars(Date start, Date end){
        if((start != null && end== null) || (start == null && end!=null))
            throw new WrongDateSpanException();

        //Retrieves all statuses that apre in the segment <start,end>
        //and are of type booked/unavailable
        List<Status> statusesWhichDenyReservation =
                statusRepository.findAll(
                        isUnavailableOrBooked().and(colidesWithDateSpan(start,end))
                );
        List<Long> unavailableCarsIds = new ArrayList<>();

        for(Status s : statusesWhichDenyReservation) {
            Long id = s.getCar().getId();
            if(!unavailableCarsIds.contains(id))
                unavailableCarsIds.add(id);
        }
        List<Car> availableCars = carRepository.findByIdNotIn(unavailableCarsIds);

        return availableCars;
    }
    //TODO testy, na paru prostych przykladach dziala, idk czy uwzglednia wszystko
    public List<Car> findUnavailableCars(Date start, Date end) {
        if((start != null && end== null) || (start == null && end!=null))
            throw new WrongDateSpanException();
        List<Status> statusesWhichDenyReservation =
                statusRepository.findAll(
                        isUnavailableOrBooked().and(colidesWithDateSpan(start,end))
                );
        List<Car> unavailableCars = new ArrayList<>();

        for(Status s : statusesWhichDenyReservation) {
            Car c = s.getCar();
            if(!unavailableCars.contains(c))
                unavailableCars.add(c);
        }
        return unavailableCars;


    }

    public Car getCar(Long id){
        if(carRepository.existsById(id)) {
            return carRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Car not found");
    }


}



