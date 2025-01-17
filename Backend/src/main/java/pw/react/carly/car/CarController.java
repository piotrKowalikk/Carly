package pw.react.carly.car;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.carly.status.StatusRepository;

import javax.validation.Valid;
import java.util.Date;

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
    public Page<Car> getCars(
            @RequestParam(name= "from",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
            @RequestParam(name= "to",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to,
            @RequestParam(required = false,name="seats") Integer seats,
            @RequestParam(required = false,name="year") Integer year,
            @RequestParam(required = false,name="make") String make,
            //pomijany jesli nie okreslimy dat
            @RequestParam(required = false,name="available", defaultValue = "true") Boolean available,
            @RequestParam(required = false, name="getall", defaultValue = "false") Boolean getAll,
            @RequestParam(required = false,name="onlyActive", defaultValue = "true") Boolean onlyActive,
            Pageable pageable
    ){

        Specification<Car> spec = Specification.where(null);
        if(seats != null)
            spec = spec.and(bySeats(seats));
        if(year != null)
            spec = spec.and(byYear(year));
        if(make!= null)
            spec = spec.and(byMake(make));
        if(from != null && to != null){
            Specification<Car> availabilitySpec = carService.getAvailabilitySpec(from,to,available);
            spec = spec.and(availabilitySpec);
        }
        if(onlyActive)
            spec = spec.and(isActive(true));
        if(getAll)
            pageable= PageRequest.of(0, Integer.MAX_VALUE, pageable.getSort());

        return carRepository.findAll(spec,pageable);
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
