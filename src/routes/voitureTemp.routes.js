const router = require('express').Router();
const materielDb = require('../db/voitureTemp.db');
const VoitureTemp = require('../models/voitureTemp');
const { HttpResponse } = require('./HttpResponse');
const { ObjectID } = require('bson');


router.get('/generate', async (req, res) => {
    try {
        console.log('generate Materiel')
        const result = await VoitureTemp.insertMany(materielDb)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.get('/', async (req, res) => {
    try {
        const filter = {}
        const result = await VoitureTemp.find(filter, null, { sort: { updatedAt: 1 } });
        console.log('get All VoitureTemp', result);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.get('/reparation', async (req, res) => {
    try {
        const filter = {}
        const result = await VoitureTemp.find(filter, null, { sort: { updatedAt: 1 } });
        console.log('get All VoitureTemp Reparation', result);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})


router.post('/ajout', async (req, res) => {
    try {
        const voiture = new VoitureTemp({          
            user : new ObjectID("63c9306e90ea5f086a002edf"),
            marque: req.body.marque,
            type : req.body.type,
            year : req.body.year,
            immatriculation : req.body.matricule,
            etat : req.body.etat,
            reparation : []
            });
           
            await voiture.save()  
            .then(() => console.log("voiture insérer"), res.send("success"))
            .catch((err) => console.log(err))  
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

module.exports = router;