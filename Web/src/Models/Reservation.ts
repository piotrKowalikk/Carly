
import {EnumType} from './EnumType'

export class Reservation {
    static parseData(data: any) {
        throw new Error("Method not implemented.");
    }
    id: string;
    carId: string;
    userId: string;
    comment: string;
    dateFrom: Date;
    dateTo: Date;
    type: EnumType;

    constructor(data: any) {
        this.id = data.id ?? null;
        this.carId = data.carId ?? null;
        this.userId = data.userId ?? null;
        this.comment = data.comment ?? null;
        this.dateFrom = data.dateFrom ?? null;
        this.dateTo = data.dateTo ?? null;
        this.type = data.type ?? null;
    }
}