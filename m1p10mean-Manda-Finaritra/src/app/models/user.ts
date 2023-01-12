import {Voiture} from "./voiture";

export class User {
    _id!: string;
    nom!: string;
    prenom!: string;
    email!: string;
    password!: string;
    phone!: string;
    loginType!: number;
    voiture!: Voiture[];
}