const mongoose = require('mongoose');
const userSchema = require('./user');
const uri = process.env.MONGO_URI

mongoose.connect(uri)
    .then((data) => console.log('DB Connected!'))
    .catch((err) => { console.log(err, 'error'); })


exports.Users = mongoose.model('User', userSchema);
