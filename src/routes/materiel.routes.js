const router = require('express').Router();
const materielDb = require('../db/materiel.db');
const Materiel = require('../models/materiel')

router.get('/generate', async (req, res) => {
    try {
        console.log('generate Materiel')
        const result = await Materiel.insertMany(materielDb)
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
        const result = await Materiel.findOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.get('/', async (req, res) => {
    try {
        console.log('get All Materiel')
        const filter = {}
        if (req.query.id) filter._id = req.query.id
        const result = await Materiel.find(filter, null, { sort: { updatedAt: 1 } })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.post('/', async (req, res) => {
    try {
        console.log('save Materiel', req.body)
        let materiel = new Materiel(req.body)
        materiel = await droit.save()
        console.log('new', materiel)
        res.json(materiel)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/', async (req, res) => {
    try {
        const data = req.body
        console.log("Update Materiel: ", data);
        const filter = {}
        if (data._id) filter._id = data._id
        else {
            res.status(404).json({ success: false, msg: "ID required" })
            return
        }
        const materiel = await Droit.findOneAndUpdate(filter, data)
        res.json(materiel)
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
        const result = await Materiel.deleteOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})



module.exports = router;