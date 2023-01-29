const router = require('express').Router();
const userDb = require('../db/users.db');
const Users = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
    try {
        console.log("Login client");
        const filter = {}
        let good = false
        if (req.body.email) filter.email = req.body.email
        else return res.status(400).json({ msg: 'Email requis' })
        const result = await Users.findOne(filter)
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
            res.send({ users: result, token })
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
        const user = new Users(req.body)
        const result = await Users.findOne({ $or: [{ email: user.email }, { nom: user.nom }] })
        if (result) {
            res.status(409).json({ msg: "L'utilisateur existe déjà" })
            return
        }
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() + 1);
        user.activationLimit = dateLimit
        user.password = await bcrypt.hash(user.password, 10)
        user.activationCode = Math.floor(100000 + Math.random() * 900000)
        user.roles = []
        delete user._id
        console.log("Users::", user);
        await user.save()
        const newUser = await Users.findOne({ email: user.email }).select('-password')
        // delete newUser.password
        console.log('new', newUser);
        const token = jwt.sign(
            { userId: result._id, email: result.email, username: result.usename },
            process.env.TOKEN_KEY,
            { expiresIn: "24h" }
        )
        res.send({
            users: result,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
})

module.exports = router;