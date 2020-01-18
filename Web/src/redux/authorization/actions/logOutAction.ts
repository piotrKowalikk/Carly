import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';

export const logOutAction = () => {
    return dispatch => {
        dispatch({
            type: AuthorizeActionTypes.LOGOUT
        });
    }
}
