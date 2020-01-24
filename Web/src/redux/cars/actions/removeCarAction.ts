import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { getAdmins, getCars } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';

export const removeCarAction = () => {
    return async dispatch => {
        try {
            dispatch({
                type: CarActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            //       await delay(2000);

            var response = await axios.delete(getCars(), {
                headers: {
                    crossDomain: true,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
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
        type: CarActionTypes.GET_CARS,
        payload: {
            cars: Car.parseData(data),
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