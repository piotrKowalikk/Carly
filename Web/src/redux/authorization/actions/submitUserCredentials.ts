import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';
import { logIn } from '../../.resources/apiURLs';
import { store } from '../../store'
import { StorageTwoTone } from '@material-ui/icons';

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
                email: login,
                password: password
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
    sessionStorage.setItem('jwtToken', token);
    return {
        type: AuthorizeActionTypes.AUTHORIZED,
        payload: {
            errorMessage: null,
            token: token
        }
    }
}
