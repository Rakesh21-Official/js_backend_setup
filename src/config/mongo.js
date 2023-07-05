const mongoose = require('mongoose');

module.exports = mongoConnect = async () => {
    let uri = process.env.MONGO_URI
    await mongoose.connect(uri)
        .then((data) => console.log('DB Connected!'))
        .catch((err) => { console.log(err, 'error'); })
}

module.exports = dbConnect = async () => {
    try {
        await mongoConnect()
    } catch (error) {
        console.log(error);
    }
}
