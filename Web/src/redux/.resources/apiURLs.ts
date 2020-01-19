import { ReservationStatus } from '../../Enums/ReservationStatuses'

export const mainURL = (): string => {
    return 'http://localhost:8080';
}

export const getReservations = (isType: ReservationStatus, from: Date, to: Date): string => {
    return mainURL() + `/statuses?isType=${isType.toString()}&from=${from.toISOString()}&to=${to.toISOString()}`;
}

export const getCars = (): string => {
    return mainURL() + `/cars`;
}

export const postCar = (): string => {
    //TODO:
    return mainURL() + ``;
}

export const getAdmins = (): string => {
    return mainURL() + `/admins`
}