import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { getAdmins, getCars, getAllCarReservations } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { Reservation } from '../../../Models/Reservation';
import { store } from '../../store';

export const selectCarAction = (car: Car) => {

    return async dispatch => {
        try {
            dispatch({
                type: CarActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            //       await delay(2000);

            var response = await axios.get(getAllCarReservations(car.id), {
                headers: {
                    crossDomain: true,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': store.getState().authorize.token
                },
            });
            dispatch(successHandle(response.data, car));
        }
        catch (error) {
            dispatch(errorHandle());
        }

    }
}

const successHandle = (data, car) => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.SELECT_CAR,
            payload: {
                selectedCar: car,
                reservations: Reservation.parseData(data)
            }
        });
    }
}

const errorHandle = () => {
    //handle message from server
    return {
        type: CarActionTypes.GET_CARS,
        payload: {
            cars: [],
            errorMessage: 'Not valid input.'
        }
    }
}