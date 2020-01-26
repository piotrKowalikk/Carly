
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



    //     bookingUserInfo: {id: 1002, name: "Adrian", surname: "Jaszczomp", email: "booking3@mail.com"}
    // id: 1002
    // name: "Adrian"
    // surname: "Jaszczomp"
    // email: "booking3@mail.com"
    // comment: "Anulowana rezerwacja"
    // dateFrom: "2020-01-22T23:00:00.000+0000"
    // dateTo: "2020-01-24T23:00:00.000+0000"
    // type: "BOOKINGCANCELED"

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
                reservations.push(new Reservation(
                    {
                        id: x.id,
                        name: x.bookingUserInfo ? x.bookingUserInfo.name : null,
                        surname: x.bookingUserInfo ? x.bookingUserInfo.surname : null,
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