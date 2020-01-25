import axios from 'axios'
import { AuthorizeActionTypes } from '../types/authorizationTypes';
import { logIn } from '../../.resources/apiURLs';

export const submitUserCredentials = (login: string, password: string) => {
    return async dispatch => {
        try {
            //lefted as example of requesting dat
            //login and password should be sent to backend and not saved in the store. if data about user is available then it should be saved.
            dispatch({
                type: AuthorizeActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            const user = {
                email: "ada@klimczak",
                password: "ada"
            }
            // dispatch(successHandle(null));
            var headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("access-control-expose-headers", "Authorization");
            headers.append("Access-Control-Allow-Origin", "*");
            headers.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
            headers.append("Access-Control-Allow-Headers", "Content-Type, x-auth-token, Authorization");
            headers.append("Access-Control-Expose-Headers", "x-auth-token, Authorization");
            const requestOptions: any = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(user)
            };
            fetch("http://carly.us-east-1.elasticbeanstalk.com/login", requestOptions)
                .then(response => {

                    if (response.status == 200) {
                        console.log(response.headers.get('x-auth-token'))
                        console.log(response.headers.get("authorization"))
                        console.log(response.headers.get("Authorization"))
                        response.headers.forEach(x => console.log(x)); // accessing the entries
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            // dispatch(successHandle(response));
        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}

//enums would be better
const successHandle = (data) => {
    var token = data.headers.get("Authorization")
    console.log(data.headers)
    return {
        type: AuthorizeActionTypes.AUTHORIZED,
        payload: {
            errorMessage: null,
            token: token
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