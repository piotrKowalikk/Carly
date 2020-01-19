import axios from 'axios'
import { UserActionTypes } from '../types/userTypes';
import { getAdmins, mainURL } from '../../.resources/apiURLs';
import { User } from '../../../Models/User';

export const fetchUsers = () => {
    return async dispatch => {
        try {
            dispatch({
                type: UserActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            //   await delay(2000);

            var response = await axios.get(getAdmins(), {
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

const successHandle = (data) => {
    return {
        type: UserActionTypes.GET_USERS,
        payload: {
            users: User.parseData(data),
            errorMessage: null
        }
    }
}

const errorHandle = () => {
    //handle message from server
    return {
        type: UserActionTypes.GET_USERS,
        payload: {
            cars: [],
            errorMessage: 'Not valid input.'
        }
    }
}