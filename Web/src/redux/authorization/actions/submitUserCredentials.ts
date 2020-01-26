import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';
import { logIn } from '../../.resources/apiURLs';
import { store } from '../../store'

export const submitUserCredentials = (login: string, password: string) => {
    return async dispatch => {
        try {
            store.dispatch({
                type: AuthorizeActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            const user = {
                email: login,//"ada@klimczak",
                password: password//"ada"
            }
            var headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions: any = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(user)
            };
            var response = await fetch(logIn(), requestOptions);
            var responseToJson = await response.json();

            console.log(responseToJson)
            if (response.status != 200)
                throw new Error('Not authorized');
            store.dispatch(successHandle(responseToJson));
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
//enums would be better
const successHandle = (data) => {
    var token = data.Authorization;
    return {
        type: AuthorizeActionTypes.AUTHORIZED,
        payload: {
            errorMessage: null,
            token: token
        }
    }
}
