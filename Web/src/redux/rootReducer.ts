import { combineReducers } from "redux";
import { authorizeReducer } from "./authorization/authorizeReducer";
import { IAuthorizeState } from "./authorization/types/authorizationTypes";
import { ICarState } from "./cars/types/carTypes";
import { carsReducer } from "./cars/carsReducer";


export interface IApplicationState {
     authorize: IAuthorizeState;
     cars: ICarState;
}

export const rootReducer = combineReducers({
     authorize: authorizeReducer,
     cars: carsReducer
});