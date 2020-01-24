import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { deleteCar } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';

export const removeCarAction = (id: string) => {
    return async dispatch => {
        try {
            dispatch({
                type: CarActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            //       await delay(2000);

            var response = await axios.delete(deleteCar(id), {
                headers: {
                    crossDomain: true,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });
            dispatch(successHandle(response.data, id));
        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}


//enums would be better
const successHandle = (data, id) => {
    return {
        type: CarActionTypes.DELETE_CAR,
        payload: {
            deletedCarId: id,
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