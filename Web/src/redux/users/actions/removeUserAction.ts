import axios from 'axios'
import { UserActionTypes } from '../types/userTypes';
import { deleteAdmin } from '../../.resources/apiURLs'
import { User } from '../../../Models/User';
import { useDispatch } from 'react-redux';
import { store } from '../../store';

export const removeUserAction = async (dispatch: any, id: string) => {
    try {
        var response = await axios.delete(deleteAdmin(id), {
            headers: {
                crossDomain: true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                'Authorization': store.getState().authorize.token
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
        type: UserActionTypes.DELETE,
        payload: {
            deletedUserId: id,
            errorMessage: null
        }
    }
}

// const errorHandle = () => {
//     //handle message from server
//     return {
//         type: UserActionTypes.DELETE_CAR,
//         payload: {
//             cars: [],
//             errorMessage: 'Not valid input.'
//         }
//     }
// }