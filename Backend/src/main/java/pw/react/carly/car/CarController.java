package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.carly.status.StatusRepository;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

import static pw.react.carly.car.CarSpecification.*;

@RestController
@RequestMapping("/cars")
public class CarController {
    private CarService carService;
    private CarRepository carRepository;
    private StatusRepository statusRepository;

    @Autowired
    public CarController(CarService carService, CarRepository carRepository, StatusRepository statusRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
        this.statusRepository = statusRepository;
    }



    @GetMapping()
    public ResponseEntity<List> getCars(
            //TODO dodac wyszukiwanie dostepnych aut
            @RequestParam(name= "from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
            @RequestParam(name= "to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to,
            @RequestParam(required = false,name="seats") Integer seats,
            @RequestParam(required = false,name="year") Integer year,
            @RequestParam(required = false,name="make") String make
    ){


        Specification<Car> spec = Specification.where(null);
        if(seats != null)
            spec = spec.and(bySeats(seats));
        if(year != null)
            spec = spec.and(byYear(year));
        if(make!= null)
            spec = spec.and(byMake(make));

        return ResponseEntity.ok().body(carRepository.findAll(spec));
    }
    //TODO usunac oddzielne endpointy. Polaczyc w jeden, albo dodac jako enum do GET:/cars
    @GetMapping("/available")
    public ResponseEntity<List<Car>> getAvailable(
             @RequestParam(name= "from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
             @RequestParam(name= "to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to
    ){
        return ResponseEntity.ok().body(carService.findAvailableCars(from,to));
    }
    @GetMapping("/unavailable")
    public ResponseEntity<List<Car>> getUnavailable(
            @RequestParam(name= "from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
            @RequestParam(name= "to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to
    ){
        return ResponseEntity.ok().body(carService.findUnavailableCars(from,to));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(carService.getCar(id));
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
