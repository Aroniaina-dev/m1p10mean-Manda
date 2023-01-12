import {Materiel} from "./materiel";

export class Voiture {
    _id!: string;
    immatriculation!: string;
    marque!: string;
    modele!: string;
    materiel!: Materiel[];
    dateEntrerGarage!: Date;
    dateSortieGarage!: Date;
}