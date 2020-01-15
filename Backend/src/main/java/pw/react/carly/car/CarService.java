package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import pw.react.carly.status.Status;
import pw.react.carly.status.StatusRepository;

import java.util.Date;
import java.util.List;

import static pw.react.carly.status.StatusSpecifications.toDateAfter;
import static pw.react.carly.status.StatusSpecifications.toDateBefore;


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
//TODO
//    public List<Status> findAvailableCars(Date start, Date end){
//        //Retrieves all statuses that are in the segment <start,end>
//        List<Status> statuses =
//                statusRepository.findAll(
//                        //     <start       |from-----end>|-----to|
//                        (toDateAfter(end).and(toDateBefore(end)))
//                                //     <start  |from---------to| end>|
//                                //  |from---- <start-----to| end>|
//                        .or(toDateBefore(end).and(toDateAfter(start))));
//        return statuses;
//    }

    public Car getCar(Long id){
        if(carRepository.existsById(id)) {
            return carRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Car not found");
    }
}
