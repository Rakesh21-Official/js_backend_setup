const express = require('express');
const Postgres = require('../config/postgres');
const HTTPResponseCode = require('../library/responsecode');
const dbConnect = require('../config/mongo');



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
            let result = await dbConnect()

            return res.status(HTTPResponseCode.SUCCESS).send({
                result: result
            })
        } catch (error) {
            console.log(error, 'error');
            res.status(HTTPResponseCode.INTERNAL_SERVER_ERROR).send({ 'error': error })
        }
    })

    return router;
}