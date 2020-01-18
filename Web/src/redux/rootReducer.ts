import { combineReducers } from "redux";
import { authorizeReducer } from "./authorization/authorizeReducer";
import { IAuthorizeState } from "./authorization/types/authorizationTypes";


export interface IApplicationState{
     authorize : IAuthorizeState;
}

export const rootReducer = combineReducers({  
     authorize: authorizeReducer
});