package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import pw.react.carly.status.Status;
import pw.react.carly.status.StatusRepository;
import pw.react.carly.status.StatusService;

import java.util.Date;
import java.util.List;

import static pw.react.carly.status.StatusSpecifications.*;


@Service
public class CarService {

    private StatusRepository statusRepository;
    private CarRepository carRepository;
    private StatusService statusService;
    @Autowired
    public CarService(StatusRepository statusRepository, CarRepository carRepository,StatusService statusService) {
        this.statusRepository = statusRepository;
        this.statusService = statusService;
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

    public boolean checkIfAvailable(Car car, Date from, Date to){
        List<Status> statuses = statusRepository.findAll(byCarId(car.getId()).and(isUnavailableOrBooked()).and(colidesWithDateSpan(from,to)));
        return statuses.isEmpty();
    }

    public Car getCar(Long id){
        if(carRepository.existsById(id)) {
            return carRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Car not found");
    }
}



