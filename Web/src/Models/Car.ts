


export class Car {
    id: string;
    carMake: string;
    carModel: string;
    licenseNumber: string;
    availability: string;

    constructor(data: any) {
        this.id = data.id ?? null;
        this.carMake = data.carMake ?? null;
        this.carModel = data.carModel ?? null;
        this.licenseNumber = data.licenseNumber ?? null;
        this.availability = data.availability ?? null;
    }
}