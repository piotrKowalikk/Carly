import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { postCar } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { store } from '../../store';

export const createCarAction = (car: Car) => {
    return async dispatch => {
        try {

            var response = await axios.post(postCar(),
                {
                    model: car.carModel,
                    make: car.carMake,
                    seats: car.seats,
                    year: car.year,
                    licence: car.licenseNumber,
                    location: car.location,
                    price: car.price,
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

const successHandle = (data) => {
    return {
        type: CarActionTypes.GET_CARS,
        payload: {
            cars: Car.parseData(data),
            errorMessage: null
        }
    }
}

const errorHandle = () => {
    return {
        type: CarActionTypes.GET_CARS,
        payload: {
            cars: [],
            errorMessage: 'Not valid input.'
        }
    }
}