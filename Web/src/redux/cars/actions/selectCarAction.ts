import { CarActionTypes } from '../types/carTypes';
import { Car } from '../../../Models/Car';

export const selectCarAction = (car: Car) => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.SELECT_CAR,
            payload: {
                selectedCar: car
            }
        });
    }
}