const express = require('express');
const router = express();
const userRouter = require('./src/routes/user.routes');
const materielRouter = require('./src/routes/materiel.routes');
const voitureRouter = require('./src/routes/voiture.routes');
const voitureTempRouter = require('./src/routes/voitureTemp.routes');
const path = require('path');


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

router.use(express.static(path.join(__dirname, 'dist')));
router.use('/users', userRouter)
router.use('/materiels', materielRouter)
router.use('/voitures', voitureRouter)
router.use('/voitureTemp', voitureTempRouter)


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/app-avocat-depoch/index.html'));
});

module.exports = router;