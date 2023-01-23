import {InfoMateriel} from "./infoMateriel";

export class Materiel {
    _id!: string;
    designationMateriel!: string;
    prixReparation!: number;
    dateDebutReparation!: string;
    dateFinReparation!: string;
    estReparer!: boolean;
}