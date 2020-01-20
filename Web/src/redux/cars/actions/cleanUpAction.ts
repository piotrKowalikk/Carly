import { CarActionTypes } from '../types/carTypes';

export const cleanupAction = () => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.CLEANUP,
            payload: {
                errorMessage: null,
            }
        });
    }
}