const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Aroniaina:Aroniaina@cluster0.mbj6q5j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), console.log(process.env.DB_LINK))
    .catch(err => console.log(err));