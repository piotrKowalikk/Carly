import { Reducer } from "react";
import { IUserState, UserActionTypes } from "./types/userTypes";
import { User } from "../../Models/User";

export const initialState: IUserState = {
    users: null,
    isLoading: false,
    errorMessage: null
}

const usersReducer: Reducer<IUserState, any> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.GET_USERS: {
            const { errorMessage, users } = action.payload;
            return Object.assign({}, state, { users, errorMessage, isLoading: false })
        }
        case UserActionTypes.LOADING: {
            return Object.assign({}, state, { ...state, isLoading: true })
        }
        case UserActionTypes.CLEANUP: {
            return Object.assign({}, state, { ...initialState })
        }
        case UserActionTypes.DELETE: {
            var users: User[] = state.users.filter(x => x.id != action.payload.deletedUserId)
            return Object.assign({}, state, { users })
        }
        default:
            return state;
    }
}

export { usersReducer as usersReducer }
