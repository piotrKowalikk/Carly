import { CarActionTypes } from '../types/carTypes';

export const cleanUpDetailsAction = () => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.CLEANUP_DETAILS,
            payload: {
                errorMessage: null,
            }
        });
    }
}