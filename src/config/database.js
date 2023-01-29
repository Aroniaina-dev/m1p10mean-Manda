const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/m1p10mean-manda-finaritra-offline', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), console.log(process.env.DB_LINK))
    .catch(err => console.log(err));