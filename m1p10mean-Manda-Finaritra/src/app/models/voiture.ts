import {Materiel} from "./materiel";

export class Voiture {
    _id!: string;
    immatriculation!: string;
    marque!: string;
    modele!: string;
    materiel!: Materiel[];
    estDansLeGarage!: boolean;
    dateEntrerGarage!: Date;
    dateSortieGarage!: Date;
    estTerminer!: boolean;
    bonDeSortie!: boolean;
    payer!: boolean;
    estPayer!: boolean;
    estRecuperer!:boolean;
}