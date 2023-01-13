const bcrypt = require("bcrypt");
const client1 = bcrypt.hash("client1", 10);
const client2 = bcrypt.hash("client2", 10);
const atelier1 = bcrypt.hash("atelier1", 10);
const atelier2 = bcrypt.hash("atelier2", 10);
const financier1 = bcrypt.hash("financier1", 10);
const financier2 = bcrypt.hash("financier2", 10);


module.exports = users = [
    {
        "nom": 'Client 1',
        "prenom": 'Valeur 1',
        "email": "client1@gmail.com",
        "password": client1,
        "phone": "0349496013",
        "loginType": 0, 
        voiture: [
            {
                "immatriculation": '1578WWT',
                "marque": "Nissan",
                "modele": "Nissan",
                "materiel": [
                    {
                        "designationMateriel": "Vitre avant",
                        "prixReparation": 30000
                    },
                    {
                        "designationMateriel": "Moteur",
                        "prixReparation": 60000
                    },
                ],
                estDansLeGarage: false
            },
        ]
    },
    {
        "nom": 'Client 2',
        "prenom": 'Valeur 2',
        "email": "client2@gmail.com",
        "password": client2,
        "phone": "0349496013",
        "loginType": 0, 
        voiture: [
            {
                "immatriculation": '1010WWT',
                "marque": "Golf",
                "modele": "Type 4",
                "materiel": [
                    {
                        "designationMateriel": "Valve pneu",
                        "prixReparation": 10000
                    },
                    {
                        "designationMateriel": "Vitre avant",
                        "prixReparation": 30000
                    },
                    {
                        "designationMateriel": "Moteur",
                        "prixReparation": 60000
                    },
                ],
                estDansLeGarage: false
            },
            {
                "immatriculation": '1011WWT',
                "marque": "Golf",
                "modele": "Type 4",
                "materiel": [
                    {
                        "designationMateriel": "Valve pneu",
                        "prixReparation": 10000
                    },
                    {
                        "designationMateriel": "Vitre avant",
                        "prixReparation": 30000
                    },
                    {
                        "designationMateriel": "Moteur",
                        "prixReparation": 60000
                    },
                ],
                estDansLeGarage: false
            },
            {
                "immatriculation": '4572TAA',
                "marque": "Mercedes",
                "modele": "CDI",
                "materiel": [
                    {
                        "designationMateriel": "Porte",
                        "prixReparation": 50000
                    },
                    {
                        "designationMateriel": "CApitulage",
                        "prixReparation": 9000
                    },
                ],
                estDansLeGarage: false
            },
        ]
    },
    {
        "nom": 'atelier 1',
        "prenom": 'atelier 1',
        "email": "atelier1@gmail.com",
        "password": atelier1,
        "phone": "0349496013",
        "loginType": 1, 
        voiture: []
    },
    {
        "nom": 'atelier 2',
        "prenom": 'atelier 2',
        "email": "atelier2@gmail.com",
        "password": atelier2,
        "phone": "0349496013",
        "loginType": 1, 
        voiture: []
    },
    {
        "nom": 'financier 1',
        "prenom": 'financier 1',
        "email": "financier1@gmail.com",
        "password": financier1,
        "phone": "0349496013",
        "loginType": 1, 
        voiture: []
    },
    {
        "nom": 'financier 2',
        "prenom": 'financier 2',
        "email": "financier2@gmail.com",
        "password": financier2,
        "phone": "0349496013",
        "loginType": 1, 
        voiture: []
    },
]