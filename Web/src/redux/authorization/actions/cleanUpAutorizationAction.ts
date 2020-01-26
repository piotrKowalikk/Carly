import { AuthorizeActionTypes } from "../types/authorizationTypes"

export const cleanUpAutorizationAction = () => {
    return {
        type: AuthorizeActionTypes.CLEANUP
    }
}