import { UserActionTypes } from "../types/userTypes";

export const cleanUpUsersAction = () => {
    return dispatch => {
        dispatch({
            type: UserActionTypes.CLEANUP,
            payload: {
                errorMessage: null,
            }
        });
    }
}