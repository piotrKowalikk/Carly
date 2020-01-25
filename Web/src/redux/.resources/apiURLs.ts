import { ReservationStatus } from '../../Enums/ReservationStatuses'

export const mainURL = (): string => {
    return 'http://localhost:8080';
}

export const getAllCarReservations = (carId: string): string => {
    return mainURL() + `/statuses?carID=${carId}`;
}
export const getAllReservations = (): string => {
    return mainURL() + `/statuses`;
}

export const getCars = (): string => {
    return mainURL() + `/cars`;
}

export const postCar = (): string => {
    //TODO:
    return mainURL() + `/cars`;
}

export const getAdmins = (): string => {
    return mainURL() + `/admins`
}

export const deleteCar = (carID: string) => {
    return mainURL() + `/cars/${carID}`
}