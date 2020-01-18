import { Reducer } from "react";
import { badLogin, badPassword } from "./authorizeMessages";
import { IAuthorizeState, AuthorizeActionTypes } from "./types/authorizationTypes";

export const initialState: IAuthorizeState = {
    isAuthorized: false,
    //user data should be stored here
    login: null,
    password: null,
    message: null,
    isLoading: true
}

const authorizeReducer: Reducer<IAuthorizeState, AuthorizeActionTypes> = (state = initialState, action) => {
    switch (action) {
        case AuthorizeActionTypes.BAD_PASSWORD: {
            const message = badLogin;
            return Object.assign({}, state, { ...state, message, isLoading: false })
        }
        case AuthorizeActionTypes.BAD_LOGIN: {
            const message = badPassword;
            return Object.assign({}, state, { ...state, message, isLoading: false })
        }
        case AuthorizeActionTypes.LOADING: {
            return Object.assign({}, state, { ...state, isLoading: true })
        }
        case AuthorizeActionTypes.AUTHORIZED: {
            return Object.assign({}, state, { ...state, isLoading: false, isAuthorized: true })
        }
        default:
            return state;
    }
}

export { authorizeReducer as authorizeReducer }
