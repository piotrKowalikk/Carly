import { CarActionTypes } from '../types/carTypes';

export const cleanUpCarsAction = () => {
    return dispatch => {
        dispatch({
            type: CarActionTypes.CLEANUP_CARS,
            payload: {
                errorMessage: null,
            }
        });
    }
}