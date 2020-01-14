package pw.react.carly.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    private CarService carService;
    private CarRepository carRepository;

    @Autowired
    public CarController(CarService carService, CarRepository carRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(carService.getCar(id));
    }
    @GetMapping("")
    public ResponseEntity<List<Car>> getAllCars(){
        return ResponseEntity.ok().body(carRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCar(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(carService.deleteCar(carService.getCar((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Car> updateCar(@RequestBody @Valid Car Car){
        return ResponseEntity.ok().body(carService.updateCar(Car));
    }
    @PutMapping(path = "")
    public ResponseEntity<Car> updateWholeCar(@RequestBody @Valid Car updatedCar) {
        return ResponseEntity.ok().body(carRepository.save(updatedCar));
    }

    @PostMapping("")
    public ResponseEntity<Car> addCar(@RequestBody @Valid Car Car) {
            return ResponseEntity.ok().body(carRepository.save(Car));
    }
}
