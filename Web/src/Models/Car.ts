


export class Car {
    id: string;
    carMake: string;
    carModel: string;
    licenseNumber: string;
    availability: string;
    seats: number;
    year: number;
    location: string;

    constructor(data: any = {}) {
        this.id = data.id ?? null;
        this.carMake = data.carMake ?? null;
        this.carModel = data.carModel ?? null;
        this.licenseNumber = data.licenseNumber ?? null;//TYPO
        this.availability = data.availability ?? null;
        this.seats = data.seats ?? null;
        this.year = data.year ?? null;
        this.location = data.location ?? null;
    }
    static parseData(data: any[]): Car[] {
        var cars: Car[] = [];
        data.forEach(x => {
            cars.push(new Car(
                {
                    id: x.id,
                    carModel: x.model,
                    carMake: x.make,
                    seats: x.seats,
                    year: x.year,//
                    licenseNumber: x.licence,
                    location: x.location,
                }
            )
            )
        });

        return cars;
    }
}