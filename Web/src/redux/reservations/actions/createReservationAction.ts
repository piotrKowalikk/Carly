import axios from 'axios'
import { ReservationActionTypes } from '../types/reservationTypes';
import { postReservation } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { Reservation } from '../../../Models/Reservation';
import { store } from '../../store';

export const createReservationAction = (reservation: Reservation) => {
    return async dispatch => {
        try {
            var data = {
                carId: reservation.carData,
                comment: reservation.comment,
                dateFrom: reservation.dateFrom.toISOString(),
                dateTo: reservation.dateTo.toISOString(),
                type: 'UNAVAILABLE'
            };
            var response = await axios.post(postReservation(),
                data
                ,
                {
                    headers: {
                        crossDomain: true,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': store.getState().authorize.token
                    },
                });
          //  dispatch(successHandle(response.data));
        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const errorHandle = () => {
    return {
        type: ReservationActionTypes.GET_RESERVATIONS,
        payload: {
            reservation: [],
            errorMessage: 'Not valid input.'
        }
    }
}