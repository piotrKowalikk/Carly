import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';

export const loadFromStorage = (token) => {
    return dispatch => {
        dispatch({
            type: AuthorizeActionTypes.LOAD_FROM_STORAGE,
            payload: {
                token: token
            }
        });
    }
}
