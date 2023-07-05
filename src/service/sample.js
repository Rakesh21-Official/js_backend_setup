const express = require('express');
const Postgres = require('../config/postgres');
const HTTPResponseCode = require('../library/responsecode');
const Modal = require('../modal');

module.exports = () => {
    const router = express.Router({});

    router.get('/cockroachdb', async (req, res) => {
        try {
            let result = await Postgres.getResult(`select * from sample`)
            console.log(result, 'result');

            return res.status(HTTPResponseCode.SUCCESS).send({
                result: result
            })
        } catch (error) {
            console.log(error, 'error');
            res.status(HTTPResponseCode.INTERNAL_SERVER_ERROR).send({ 'error': error })
        }
    });

    router.get('/mongo', async (req, res) => {
        try {
            let result = await Modal.user()
            let data = await result.find()  //to retrive list of data
            // const newData = new result({  //to add the data
            //     name: 'John Doe',
            //     email: 'johndoe1@example.com',
            //     password: 'password1234'
            // })
            // let data = newData.save().then(data => console.log(data, 'data')).catch(err => console.log(err, 'error'))
            return res.status(HTTPResponseCode.SUCCESS).send({
                result: data
            })
        } catch (error) {
            console.log(error, 'error');
            res.status(HTTPResponseCode.INTERNAL_SERVER_ERROR).send({ 'error': error })
        }
    })

    return router;
}