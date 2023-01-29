const router = require('express').Router();
const materielDb = require('../db/voitureTemp.db');
const VoitureTemp = require('../models/voitureTemp');
const { HttpResponse } = require('./HttpResponse');

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

module.exports = router;