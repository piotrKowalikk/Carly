import axios from 'axios'
import { CarActionTypes } from '../types/carTypes';
import { deleteCar } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { useDispatch } from 'react-redux';

export const removeCarAction = async (dispatch: any, id: string) => {
    try {
        var response = await axios.delete(deleteCar(id), {
            headers: {
                crossDomain: true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS'
            },
        });
        var success = successHandle(response.data, id);
        dispatch(success);
        return true;
    }
    catch (error) {
        return false;
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

// const errorHandle = () => {
//     //handle message from server
//     return {
//         type: CarActionTypes.DELETE_CAR,
//         payload: {
//             cars: [],
//             errorMessage: 'Not valid input.'
//         }
//     }
// }