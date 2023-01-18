import {InfoMateriel} from "./infoMateriel";

export class Materiel {
    _id!: string;
    designationMateriel!: string;
    prixReparation!: Number;
    dateFinReparation!: Date;
    estReparer!: boolean;
}