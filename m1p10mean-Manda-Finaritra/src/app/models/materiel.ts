import {InfoMateriel} from "./infoMateriel";

export class Materiel {
    _id!: string;
    designationMateriel!: string;
    prixReparation!: number;
    dateFinReparation!: Date;
    estReparer!: boolean;
}