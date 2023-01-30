export class Car {
    _id : string;
    marque : string;
    type : string;
    matricule : string;

    year : number;
    etat : string;
  constructor(id: string,marque: string, type: string,year: number, matricule: string, etat : string) {
    this._id = id;
    this.marque = marque;
    this.type = type;
    this.year = year;
    this.matricule = matricule;
    this.etat = etat;
  }
}
