import { CarActionTypes } from '../types/carTypes';

export const cleanUpAction = () => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.CLEANUP,
            payload: {
                errorMessage: null,
            }
        });
    }
}