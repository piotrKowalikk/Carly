


export class Car {
    id: string;
    carMake: string;
    carModel: string;
    licenseNumber: string;
    seats: number;
    year: number;
    location: string;
    price: number;

    constructor(data: any = {}) {
        if (!data)
            return;
        this.id = data.id ?? null;
        this.carMake = data.carMake ?? null;
        this.carModel = data.carModel ?? null;
        this.licenseNumber = data.licenseNumber ?? null;
        this.seats = data.seats ?? null;
        this.year = data.year ?? null;
        this.location = data.location ?? null;
        this.price = data.price ?? null;
    }
    static parseData(data: any): Car[] {
        var cars: Car[] = [];
        if (!data)
            return [];
        try {
            data.content.forEach(x => {
                cars.push(new Car(
                    {
                        id: x.id,
                        carModel: x.model,
                        carMake: x.make,
                        seats: x.seats,
                        year: x.year,
                        licenseNumber: x.licence,
                        location: x.location,
                        price: x.price
                    }
                )
                )
            });
        }
        catch (e) {

            console.log('parse car exception')
            console.log(e)
        }
        return cars;
    }
}