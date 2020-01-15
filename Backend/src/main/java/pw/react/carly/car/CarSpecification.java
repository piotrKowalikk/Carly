package pw.react.carly.car;

import org.springframework.data.jpa.domain.Specification;

public class CarSpecification {
    public static Specification<Car> bySeats(int seats){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.seats),seats);
        };
    }
    public static Specification<Car> byDoors(int doors){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.doors),doors);
        };
    }
    public static Specification<Car> byYear(int year){
        return (root,query,criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get(Car_.year),year);
        };
    }


}
