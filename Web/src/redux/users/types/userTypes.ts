import { User } from "../../../Models/User";

export interface IUserState {
    users: User[];
    isLoading: boolean;
    errorMessage: string;
}

export enum UserActionTypes {
    LOADING="LOADING",
    GET_USERS="GET_USERS",
    CLEANUP="CLEANUP",
    DELETE="DELETE"
}