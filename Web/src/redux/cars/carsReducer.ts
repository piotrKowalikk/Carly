import { Reducer } from "react";
import { ICarState, CarActionTypes } from "./types/carTypes";
import { Car } from "../../Models/Car";

export const initialState: ICarState = {
    cars: [],
    selectedCar: null,
    isLoading: false,
    errorMessage: null,
    selectedCarReservations: []

}

const carsReducer: Reducer<ICarState, any> = (state = initialState, action) => {
    switch (action.type) {
        case CarActionTypes.GET_CARS: {
            const { errorMessage, cars } = action.payload;
            return Object.assign({}, state, { ...state, selectedCar: null, cars, selectedCarReservations: [], errorMessage, isLoading: false })
        }
        case CarActionTypes.LOADING: {
            return Object.assign({}, state, { ...state, isLoading: true })
        }
        case CarActionTypes.CLEANUP_CARS: {
            return Object.assign({}, state, { cars: [], errorMessage: null })
        }
        case CarActionTypes.CLEANUP_DETAILS: {
            return Object.assign({}, state, { cars: [], selectedCarReservations: [], errorMessage: null })
        }
        case CarActionTypes.DELETE_CAR: {
            var cars: Car[] = state.cars.filter(x => x.id != action.payload.deletedCarId);
            return Object.assign({}, state, { ...initialState })
        }
        case CarActionTypes.SELECT_CAR: {
            return Object.assign({}, state, { ...state, selectedCar: action.payload.selectedCar, selectedCarReservations: action.payload.reservations })
        }
        case CarActionTypes.EDIT_CAR: {
            return Object.assign({}, state, { ...initialState })
        }
        default:
            return state;
    }
}

export { carsReducer as carsReducer }
