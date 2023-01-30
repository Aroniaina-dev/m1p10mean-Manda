export class Users {
    nom: string;
    prenom: string;
    email : string;
    password: string;
    phone : string;
    loginType : number;
  
    constructor(nom: string, prenom: string, email: string, password: string, phone: string, loginType : number) {
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.password = password;
      this.phone = phone;
      this.loginType = loginType;
    }
  
  
  
  }
  