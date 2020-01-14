package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class CarService {

    private CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
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

    public Car getCar(Long id){
        if(carRepository.existsById(id)) {
            return carRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Car not found");
    }
}
