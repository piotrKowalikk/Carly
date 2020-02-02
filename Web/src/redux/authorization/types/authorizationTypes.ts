export interface IAuthorizeState {
    readonly isAuthorized: boolean;
    readonly message: string;
    readonly isLoading: boolean;
    readonly token: string;
}

export enum AuthorizeActionTypes {
    BAD_PASSWORD = '@@authorize/BAD_PASSWORD',
    BAD_LOGIN = '@@authorize/BAD_LOGIN',
    LOADING = '@@authorize/LOADING',
    AUTHORIZED = '@@authorize/AUTHORIZED',
    LOGOUT = '@@authorize/LOGOUT',
    CLEANUP = "CLEANUP",
    LOAD_FROM_STORAGE = "LOAD_FROM_STORAGE"
}