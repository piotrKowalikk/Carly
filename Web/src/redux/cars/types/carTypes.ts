import { Car } from "../../../Models/Car";

export interface ICarState {
    cars: Car[];
    selectedCar: Car;
    isLoading: boolean;
    errorMessage: string;
}

export enum CarActionTypes {
    LOADING = "LOADIND",
    SELECT_CAR = "SELECT_CAR",
    GET_CARS = "GET_CARS",
    CLEANUP = "CLEANUP",
    DELETE_CAR = "DELETE_CAR"
}