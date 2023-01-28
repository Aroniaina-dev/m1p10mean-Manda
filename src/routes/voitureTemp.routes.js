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
        // if (req.query.id) filter._id = req.query.id
        const result = new HttpResponse (await VoitureTemp.find(filter, null, { sort: { updatedAt: 1 } }))
        console.log('get All VoitureTemp', result);
        res.status(result.statusCode).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

exports.statMulti = async (req, res, next) => {
    try{
        const result = await service.statMulti(req.body);
        res.status(result.statusCode).json(result);

    }catch(e){
        res.status(errorResponse.statusCode).json(errorResponse);
    }
}

module.exports = router;