const bcrypt = require("bcrypt");
module.exports = users = [
    {
        "nom": 'Client 1',
        "prenom": 'Valeur 1',
        "email": "client1@gmail.com",
        "password": bcrypt.hash("client1", 10),
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
                        "prixReparation": 30000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                    {
                        "designationMateriel": "Moteur",
                        "prixReparation": 60000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                ],
                estDansLeGarage: false,
                "dateEntrerGarage": new Date(),
                "dateSortieGarage": new Date(),
                estTerminer: false
            },
        ]
    },
    {
        "nom": 'Client 2',
        "prenom": 'Valeur 2',
        "email": "client2@gmail.com",
        "password": bcrypt.hash("client2", 10),
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
                        "prixReparation": 10000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                    {
                        "designationMateriel": "Vitre avant",
                        "prixReparation": 30000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                    {
                        "designationMateriel": "Moteur",
                        "prixReparation": 60000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                ],
                estDansLeGarage: false,
                "dateEntrerGarage": new Date(),
                "dateSortieGarage": new Date(),
                estTerminer: false
            },
            {
                "immatriculation": '1011WWT',
                "marque": "Golf",
                "modele": "Type 4",
                "materiel": [
                    {
                        "designationMateriel": "Culasse",
                        "prixReparation": 10000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                    {
                        "designationMateriel": "Embreillage",
                        "prixReparation": 30000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                ],
                estDansLeGarage: false,
                "dateEntrerGarage": new Date(),
                "dateSortieGarage": new Date(),
                estTerminer: false
            },
            {
                "immatriculation": '4572TAA',
                "marque": "Mercedes",
                "modele": "CDI",
                "materiel": [
                    {
                        "designationMateriel": "Porte",
                        "prixReparation": 50000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                    {
                        "designationMateriel": "Capitonnage",
                        "prixReparation": 9000,
                        "dateDebutReparation": new Date(),
                        "dateFinReparation": new Date(),
                        estReparer: false, 
                    },
                ],
                estDansLeGarage: false,
                "dateEntrerGarage": new Date(),
                "dateSortieGarage": new Date(),
                estTerminer: false
            },
        ]
    },
]