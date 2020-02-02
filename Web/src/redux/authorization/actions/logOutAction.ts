import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';

export const logOutAction = () => {
    try {
        sessionStorage.removeItem('jwtToken');
    } catch{ }
    return dispatch => {
        dispatch({
            type: AuthorizeActionTypes.LOGOUT
        });
    }
}
