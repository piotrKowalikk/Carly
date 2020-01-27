import axios from 'axios'
import { ReservationActionTypes } from '../types/reservationTypes';
import { postReservation } from '../../.resources/apiURLs'
import { Car } from '../../../Models/Car';
import { Reservation } from '../../../Models/Reservation';
import { store } from '../../store';

export const createReservationAction = (reservation: Reservation) => {
    return async dispatch => {
        try {
            var response = await axios.post(postReservation(),
                {
                    carId: reservation.carData,
                    comment: reservation.comment,
                    dateFrom: reservation.dateFrom,
                    dateTo: reservation.dateTo
                },
                {
                    headers: {
                        crossDomain: true,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': store.getState().authorize.token
                    },
                });
            dispatch(successHandle(response.data));
        }
        catch (error) {
            dispatch(errorHandle());
        }
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const successHandle = (data) => {
    return {
        type: ReservationActionTypes.GET_RESERVATIONS,
        payload: {
            reservation: Reservation.parseData(data),
            errorMessage: null
        }
    }
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