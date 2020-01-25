import { ReservationActionTypes } from '../types/reservationTypes';

export const cleanUpReservationsAction = () => {
    return dispatch => {
        dispatch({
            type: ReservationActionTypes.CLEANUP,
            payload: {
                errorMessage: null,
            }
        });
    }
}