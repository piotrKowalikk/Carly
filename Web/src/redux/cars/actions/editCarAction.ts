import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { postCar } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { store } from '../../store';

export const editCarAction = (car: Car) => {
    return async dispatch => {
        try {
            var response = await axios.put(postCar(),
                {
                    id: car.id,
                    model: car.carModel,
                    make: car.carMake,
                    seats: car.seats,
                    price: car.price,
                    year: car.year,
                    licence: car.licenseNumber,
                    location: car.location
                },
                {
                    headers: {
                        crossDomain: true,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': store.getState().authorize.token
                    },
                });

            dispatch(successHandle(response.data));
        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//enums would be better
const successHandle = (data) => {
    return {
        type: CarActionTypes.EDIT_CAR,
        payload: {
            changedCar: Car.parseData([data]),
            errorMessage: null
        }
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