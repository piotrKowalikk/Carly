import { Reducer } from "react";
import { ICarState, CarActionTypes } from "./types/carTypes";
import { Car } from "../../Models/Car";

export const initialState: ICarState = {
    cars: [],
    selectedCar: null,
    isLoading: false,
    errorMessage: null
}

const carsReducer: Reducer<ICarState, any> = (state = initialState, action) => {
    switch (action.type) {
        case CarActionTypes.GET_CARS: {
            const { errorMessage, cars } = action.payload;
            return Object.assign({}, state, { ...state, cars, errorMessage, isLoading: false })
        }
        case CarActionTypes.LOADING: {
            return Object.assign({}, state, { ...state, isLoading: true })
        }
        case CarActionTypes.CLEANUP: {
            return Object.assign({}, state, { initialState })

        }
        // case CarActionTypes.SELECT_CAR: {
        //     return Object.assign({}, state, { ...state, selectedCar: action.payload.selectedCar })
        // }
        default:
            return state;
    }
}

export { carsReducer as carsReducer }