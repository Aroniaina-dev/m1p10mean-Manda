const router = require('express').Router();
const userRouter = require('./user.routes');
const materielRouter = require('./materiel.routes');
const voitureRouter = require('./voiture.routes');
const path = require('path');
const express = require('express');

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"] || req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

router.use(express.static(path.join(__dirname, "dist")))
router.use('/users', userRouter)
router.use('/materiels', materielRouter)
router.use('/voitures', voitureRouter)

// router.get('/', (req, res) => {
//     res.send({ message: 'Hello Manda Aroniaina NOMENJANHARY' });
// });
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = router;