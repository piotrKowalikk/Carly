export interface IAuthorizeState {
    readonly isAuthorized: boolean;
    readonly login: string;
    readonly password: string;
    readonly message: string;
    readonly isLoading: boolean;
}

export enum AuthorizeActionTypes {
    BAD_PASSWORD = '@@authorize/BAD_PASSWORD',
    BAD_LOGIN = '@@authorize/BAD_LOGIN',
    LOADING = '@@authorize/LOADING',
    AUTHORIZED = '@@authorize/AUTHORIZED',
    LOGOUT = '@@authorize/LOGOUT'
}