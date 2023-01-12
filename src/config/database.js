const mongoose = require('mongoose');

mongoose.connect(process.env.DB_LINK || 'mongodb://127.0.0.1:27017/m1p10mean-manda-finaritra-offline', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));