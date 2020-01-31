package utilities;

import pw.react.carly.car.Car;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarsTestsUtility {
    public static List<Car> getCarsWithoutId(){
        List<Car> cars = new ArrayList<Car>();

        for(int i = 0 ; i < 3 ; i++){
            Car car = new Car();
            car.setMake("TEST");
            car.setLicence("TEST");
            car.setLocation("TEST");
            car.setSeats(5);
            car.setPrice(new BigDecimal(100));
            car.setModel("TEST");
            cars.add(car);
        }
        return cars;
    }
    public static  Car getDummyCar(){
        Car car = new Car();
        car.setMake("TEST");
        car.setLicence("TEST");
        car.setLocation("TEST");
        car.setSeats(5);
        car.setPrice(new BigDecimal(100));
        car.setModel("TEST");
        return car;
    }
}
