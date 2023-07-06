const express = require('express');
const Postgres = require('../config/postgres');
const { HTTPResponseCode } = require('../library/responsecode')
const { ErrorCode } = require('../library/msgcode')
const Modal = require('../modal/index')

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
            res.status(HTTPResponseCode.INTERNAL_SERVER_ERROR).send({ error: ErrorCode.INTERNAL_SERVER_ERROR })
        }
    });

    router.get('/mongo', async (req, res) => {
        try {
            // let body = {
            //     name: "sample",
            //     email: "sample@gmail.com",
            //     password: "sample"
            // }
            // let create = await Modal.Users.create(body)

            let find = await Modal.Users.find({})

            return res.status(HTTPResponseCode.SUCCESS).send({
                result: find ? find : create
            })
        } catch (error) {
            console.log(error, 'error');
            res.status(HTTPResponseCode.INTERNAL_SERVER_ERROR).send({ error: ErrorCode.INTERNAL_SERVER_ERROR })
        }
    })

    return router;
}