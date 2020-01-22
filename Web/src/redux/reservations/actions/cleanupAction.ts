import { ReservationActionTypes } from '../types/reservationTypes';

export const cleanupAction = () => {
    return dispatch => {
        dispatch({
            type: ReservationActionTypes.CLEANUP,
            payload: {
                errorMessage: null,
            }
        });
    }
}