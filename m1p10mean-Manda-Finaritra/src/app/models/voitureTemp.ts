import {Reparation} from "./reparation";

export class VoitureTemp {
    marque!: string;
    type!: string;
    year!: number;
    immatriculation!: string;
    etat!: boolean;
    reparation!: Reparation[];
}