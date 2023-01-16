const router = require('express').Router();
const userDb = require('../db/user.db');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const uuid = require('uuid');
const nodemailer = require("nodemailer");

router.get('/generate', async (req, res) => {
    try {
        console.log('generate User')
        const result = await User.insertMany(userDb)
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
        const result = await User.findOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})


router.get('/atelier/:loginType', async (req, res) => {
    try {
        
        const filter = {}
        if (req.params.loginType){
            filter.loginType = req.params.loginType;
        } 
        else {
            res.status(400).json({ msg: 'ID required' })
            return
        }
        const result = await User.find({
            "loginType" : req.params.loginType,
            // "voiture.estDansLeGarage" : false
        });
        console.log("Get all client type: ", result);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})


router.get('/', async (req, res) => {
    try {
        // console.log('get All User')
        const filter = {}
        if (req.query.id) filter._id = req.query.id
        const result = await User.find(filter, null, { sort: { updatedAt: 1 } })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const filter = {}
        let good = false
        if (req.body.email) filter.email = req.body.email
        else return res.status(400).json({ msg: 'Email requis' })
        // else return res.status(400).json({ msg: 'Nom d\'utilisateur requis' })
        const result = await User.findOne(filter)
        if (!result) return res.status(404).json({ msg: 'Utilisateur non trouvé' })
        if (req.body.password) good = await bcrypt.compare(req.body.password, result.password)
        else return res.status(400).json({ msg: 'Mot de passe requis' })
        if (good) {
            const token = jwt.sign(
                { userId: result._id, email: result.email, username: result.usename },
                process.env.TOKEN_KEY,
                { expiresIn: "24h" }
            )
            delete result.password
            res.send({ user: result, token })
        }
        else res.status(403).json({ msg: 'Mot de passe incorrect' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.post('/signup', async (req, res) => {
    try {
        console.log('signup', req.body)
        const user = new User(req.body)
        const result = await User.findOne({ $or: [{ email: user.email }, { nom: user.nom }] })
        console.log('result', result)
        if (result) {
            res.status(409).json({ msg: "L'utilisateur existe déjà" })
            return
        }
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() + 1);
        user.activated = false
        user.activationLimit = dateLimit
        user.password = await bcrypt.hash(user.password, 10)
        user.activationCode = Math.floor(100000 + Math.random() * 900000)
        user.roles = []
        delete user._id
        await user.save()
        const newUser = await User.findOne({ email: user.email }).select('-password')
        // delete newUser.password
        console.log('new', newUser)
        res.send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/', async (req, res) => {
    try {
        const data = req.body
        console.log("Update User: ", data);
        const filter = {}
        if (data._id) filter._id = data._id
        else {
            res.status(404).json({ success: false, msg: "ID required" })
            return
        }
        const user = await User.findOneAndUpdate(filter, data)
        res.json(user)
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
        const result = await User.deleteOne(filter)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/voiture/:id', async (req, res) => {
    try {
        var voiture_id = req.params.id;
        const data = req.body
        User.update({ 'voiture._id': voiture_id },
            {
                '$set': {
                    'voiture.$.estDansLeGarage': true,
                }
            },
            function (err, model) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }
                return res.json(model);
            });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/voiture/:id/:idMateriel', async (req, res) => {
    try {
        var voiture_id = req.params.id;
        var materiel_id = req.params.idMateriel;
        const data = req.body
        User.update(
            {
                "user._id": data._id,
                "voiture": {
                    "$elemMatch": {
                        "voiture_id": voiture_id, "materiel._id": materiel_id
                    }
                }
            },
            { "$set": { 
                "voiture.$[outer].materiel.$[inner].estReparer": true
            } },
            { "arrayFilters": [
                { "outer._id": voiture_id },
                { "inner._id": materiel_id }
            ] }, (err, result) => {
            if (err) {
                console.log('Error updating service: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log(result)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

router.put('/voiture_reparer/:id', async (req, res) => {
    try {
        var voiture_id = req.params.id;
        const data = req.body
        User.update({ 'voiture._id': voiture_id },
            {
                '$set': {
                    'voiture.$.estTerminer': true,
                }
            },
            function (err, model) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }
                return res.json(model);
            });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})




router.post('/sendEmail', async (req, res) => {
    try {
        console.log("request came");
        let data = req.body;
        console.log(data.email);
        console.log(data.body);

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nomenjanaharymanda9@gmail.com',
            pass: 'Aroniaina2001!!'
        }
        });

        var mailOptions = {
        from: 'nomenjanaharymandaaroniaina@gmail.com',
        to: 'nomenjanaharymanda9@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ');
            }
          }); 
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})
module.exports = router;