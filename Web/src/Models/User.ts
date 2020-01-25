


export class User {

    id: string;
    // name: string;
    // lastName: string;
    email: string;

    constructor(data: any) {
        this.id = data.id ?? null;
        // this.name = data.name ?? null;
        // this.lastName = data.lastName ?? null;
        this.email = data.email ?? null;
    }

    static parseData(data: any) {
        var cars: User[] = [];
        if (!data)
            return [];
        try {
            data.forEach(x => {
                cars.push(new User(
                    {
                        id: x.id,
                        email: x.email
                    }
                ));
            });
        }
        catch (e) {
            console.log('parse user excecption')
            console.log(e)
        }
        return cars;
    }
}