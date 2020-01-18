import { ReservationStatus } from '../../Enums/ReservationStatuses'

export const getReservations = (isType: ReservationStatus, from: Date, to: Date): string => {
    return `/statuses?isType=${isType.toString()}&from=${from.toISOString()}&to=${to.toISOString()}`;
}

export const getCars = (): string => {
    return `/cars`;
}

export const postCar = (): string => {
    //TODO:
    return ``;
}

export const getAdmins = (): string => {
    return `/admins`
}