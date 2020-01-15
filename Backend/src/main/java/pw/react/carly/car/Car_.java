package pw.react.carly.car;


import pw.react.carly.bookingUserInfo.BookingUserInfo;
import pw.react.carly.car.Car;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.Date;

@StaticMetamodel(Car.class)
public class Car_ {
    public static volatile SingularAttribute<Car,Long> id;
    public static volatile SingularAttribute<Car, String> model;
    public static volatile SingularAttribute<Car, String> engine;
    public static volatile SingularAttribute<Car, Integer> seats;
    public static volatile SingularAttribute<Car, Integer> doors;
    public static volatile SingularAttribute<Car,Integer> year;
    public static volatile SingularAttribute<Car, String> licence;
    public static volatile SingularAttribute<Car,String> location;


}
