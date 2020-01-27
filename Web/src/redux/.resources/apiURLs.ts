import { ReservationStatus } from '../../Enums/ReservationStatuses'

export const mainURL = (): string => {
  //return 'http://localhost:8080';
    return 'http://carly.us-east-1.elasticbeanstalk.com';
}

export const logIn = () => {
    return mainURL()+'/login'
}

export const getAllCarReservations = (carId: string): string => {
    return mainURL() + `/statuses?carID=${carId}`;
}
export const getAllReservations = (): string => {
    return mainURL() + `/statuses?getall=true`;
}

export const getCars = (): string => {
    return mainURL() + `/cars?getall=true`;
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
export const deleteAdmin = (adminId: string) => {
    return mainURL() + `/admins/${adminId}`
}