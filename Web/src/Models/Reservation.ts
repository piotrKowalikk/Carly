
import { EnumType } from './EnumType'

export class Reservation {


    id: string;
    name: string;
    surname: string;
    email: string;
    comment: string;
    dateFrom: Date;
    dateTo: Date;
    type: EnumType;
    carData: string;


    constructor(data: any) {
        this.id = data.id ?? null;
        this.name = data.name ?? null;
        this.surname = data.surname ?? null;
        this.email = data.email ?? null;
        this.comment = data.comment ?? null;
        this.dateFrom = data.dateFrom ?? null;
        this.dateTo = data.dateTo ?? null;
        this.type = data.type ?? null;
        this.carData = data.carData ?? null;
    }

    static parseData(data: any) {
        var reservations: Reservation[] = [];
        if (!data)
            return [];
        try {
            data.content.forEach(x => {
                if(x.type=='UNAVAILABLE')
                {
                    // console.log('Dupa')
                }
                reservations.push(new Reservation(
                    {
                        id: x.id,
                        name: x.bookingUserInfo ? x.bookingUserInfo.name : '',
                        surname: x.bookingUserInfo ? x.bookingUserInfo.surname : 'Admin',
                        email: x.bookingUserInfo ? x.bookingUserInfo.email : null,
                        comment: x.comment,
                        dateFrom: new Date(x.dateFrom),
                        dateTo: new Date(x.dateTo),
                        type: x.type,
                        carData: x.car.licence + ' ' + x.car.make + ' ' + x.car.model
                    }
                ));
            });
        }
        catch (e) {
            console.log('parsing reservations error')
            console.log(e);
        }

        return reservations;
    }
}