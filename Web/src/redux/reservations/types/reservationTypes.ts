import { Reservation } from "../../../Models/Reservation";

export interface IReservationState {
    reservations: Reservation[];
    isLoading: boolean;
    errorMessage: string;
}

export enum ReservationActionTypes {
    LOADING = "LOADING",
    GET_RESERVATIONS = "GET_RESERVATIONS",
    CLEANUP = "CLEANUP",
}