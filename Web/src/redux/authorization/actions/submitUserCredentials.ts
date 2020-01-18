import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';

export const submitUserCredentials = (login: string, password: string) => {
    return async dispatch => {
        try {
            //lefted as example of requesting dat
            //login and password should be sent to backend and not saved in the store. if data about user is available then it should be saved.
            dispatch({
                type: AuthorizeActionTypes.LOADING,
                payload: {
                    isLoading: true,
                    login: login,
                    password: password
                }
            })
            // response = await axios.get('http://localhost:8080/scan/' + deviceNumber, {
            //     headers: {
            //         crossDomain: true,
            //         'Access-Control-Allow-Origin': '*',
            //         'Content-Type': 'application/json',
            //     },
            // }).then(response => {
            //     dispatch(successHandle(response));
            // }, error => {
            //     dispatch(errorHandle());
            // });


        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}

//enums would be better
const successHandle = (mockData) => {
    return {
        type: AuthorizeActionTypes.AUTHORIZED,
        payload: {
            //additional data maybe
            errorMessage: null
        }
    }
}

const errorHandle = () => {
    //handle message from server
    return {
        type: AuthorizeActionTypes.BAD_PASSWORD,
        payload: {
            errorMessage: 'Not valid input.'
        }
    }
}