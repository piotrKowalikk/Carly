import { Reducer } from "react";
import { IReservationState, ReservationActionTypes } from "./types/reservationTypes";

export const initialState: IReservationState = {
    reservations: [],
    isLoading: false,
    errorMessage: null
}

const reservationsReducer: Reducer<IReservationState, any> = (state = initialState, action) => {
    switch (action.type) {
        case ReservationActionTypes.GET_RESERVATIONS: {
            const { errorMessage, reservations } = action.payload;
            return Object.assign({}, state, { reservations, errorMessage, isLoading: false })
        }
        case ReservationActionTypes.LOADING: {
            return Object.assign({}, state, { ...state, isLoading: true })
        }
        case ReservationActionTypes.CLEANUP: {
            return Object.assign({}, state, { ...initialState })
        }
        default:
            return state;
    }
}

export { reservationsReducer as reservationsReducer }
