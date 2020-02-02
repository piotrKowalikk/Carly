import { Reducer } from "react";
import { badLogin, badPassword } from "./authorizeMessages";
import { IAuthorizeState, AuthorizeActionTypes } from "./types/authorizationTypes";

export const initialState: IAuthorizeState = {
    isAuthorized: false,
    token: null,
    message: null,
    isLoading: false
}

const authorizeReducer: Reducer<IAuthorizeState, any> = (state = initialState, action) => {
    switch (action.type) {
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
            return Object.assign({}, state, { ...state, isLoading: false, isAuthorized: true, token: action.payload.token })
        }
        case AuthorizeActionTypes.LOGOUT: {
            return Object.assign({}, state, { ...state, isLoading: false, isAuthorized: false, token: null })
        }
        case AuthorizeActionTypes.CLEANUP: {
            return Object.assign({}, state, { initialState })
        }
        case AuthorizeActionTypes.LOAD_FROM_STORAGE: {
            return Object.assign({}, state, { ...state, token: action.payload.token, isAuthorized: true })
        }
        default:
            return state;
    }
}

export { authorizeReducer as authorizeReducer }
