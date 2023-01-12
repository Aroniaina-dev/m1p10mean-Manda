const router = require('express').Router();
const voitureDb = require('../db/voiture.db');
const Voiture = require('../models/voiture')

router.get('/generate', async (req, res) => {
    try {
        console.log('generate Voiture')
        const result = await Voiture.insertMany(voitureDb)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const filter = {}
        if (req.params.id) filter._id = req.params.id
        else {
            res.status(400).json({ msg: 'ID required' })
            return
        }
        const result = await Voiture.findOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.get('/', async (req, res) => {
    try {
        console.log('get All Voiture')
        const filter = {}
        if (req.query.id) filter._id = req.query.id
        const result = await Voiture.find(filter, null, { sort: { updatedAt: 1 } })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.post('/', async (req, res) => {
    try {
        console.log('save Voiture', req.body)
        let voiture = new Voiture(req.body)
        voiture = await droit.save()
        console.log('new', voiture)
        res.json(voiture)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/', async (req, res) => {
    try {
        const data = req.body
        console.log("Update Voiture: ", data);
        const filter = {}
        if (data._id) filter._id = data._id
        else {
            res.status(404).json({ success: false, msg: "ID required" })
            return
        }
        const voiture = await Droit.findOneAndUpdate(filter, data)
        res.json(voiture)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const filter = {}
        if (req.params.id) filter._id = req.params.id
        else {
            res.status(400).json({ msg: 'ID required' })
            return
        }
        const result = await Voiture.deleteOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})



module.exports = router;