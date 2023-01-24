const express = require('express')
const routes = require('./app');
require('dotenv').config()
require('./src/config/database')
const app = express();

//importation des routes
const materielRoute = require('./src/routes/materiel.routes');
const userRoute = require('./src/routes/user.routes');
const voitureRoute = require('./src/routes/voiture.routes');

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('content-type', 'application/javascript;charset=utf-8');
  next();
});

const port = process.env.PORT || 3000

app.use('/', routes);

//liste des routes pour l'application
app.use('/api/materiel/', materielRoute);
app.use('/api/user/', userRoute);
app.use('/api/voiture/', voitureRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})