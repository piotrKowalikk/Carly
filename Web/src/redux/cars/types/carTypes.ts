import { Car } from "../../../Models/Car";
import { Reservation } from "../../../Models/Reservation";

export interface ICarState {
    cars: Car[];
    selectedCar: Car;
    isLoading: boolean;
    errorMessage: string;
    selectedCarReservations: Reservation[];
}

export enum CarActionTypes {
    LOADING = "LOADIND",
    SELECT_CAR = "SELECT_CAR",
    GET_CARS = "GET_CARS",
    CLEANUP = "CLEANUP",
    DELETE_CAR = "DELETE_CAR",
    EDIT_CAR = "EDIT_CAR",
    CLEANUP_DETAILS = "CLEANUP_DETAILS",
    CLEANUP_CARS = "CLEANUP_CARS"
}