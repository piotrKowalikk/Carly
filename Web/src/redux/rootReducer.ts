import { combineReducers } from "redux";
import { authorizeReducer } from "./authorization/authorizeReducer";
import { IAuthorizeState } from "./authorization/types/authorizationTypes";
import { ICarState } from "./cars/types/carTypes";
import { carsReducer } from "./cars/carsReducer";
import { IUserState } from "./users/types/userTypes";
import { usersReducer } from "./users/usersReducer";


export interface IApplicationState {
     authorize: IAuthorizeState;
     cars: ICarState;
     users: IUserState
}

export const rootReducer = combineReducers({
     authorize: authorizeReducer,
     cars: carsReducer,
     users: usersReducer
});