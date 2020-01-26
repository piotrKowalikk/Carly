import axios from 'axios'
import { ReservationActionTypes } from '../types/reservationTypes';
import { getAllReservations } from '../../.resources/apiURLs';
import { Reservation } from '../../../Models/Reservation';
import { store } from '../../store';

export const fetchAllReservations = () => {
    return async dispatch => {
        try {
            dispatch({
                type: ReservationActionTypes.LOADING,
                payload: {
                    isLoading: true,
                }
            });
            //   await delay(2000);

            var response = await axios.get(getAllReservations(), {
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
            reservations: Reservation.parseData(data),
            errorMessage: null
        }
    }
}

const errorHandle = () => {
    //handle message from server
    return {
        type: ReservationActionTypes.GET_RESERVATIONS,
        payload: {
            reservations: [],
            errorMessage: 'Not valid input.'
        }
    }
}