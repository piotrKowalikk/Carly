


export class User{
    id :string;
    name: string;
    lastName: string;
    email: string;

   constructor(data :any){
        this.id = data.id ??null;
       this.name = data.name ?? null;
       this.lastName = data.lastName ?? null;
       this.email = data.email ?? null;
    }
}