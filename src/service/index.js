const express = require('express');
const sample = require('./sample')


function service() {
    const router = express.Router();

    router.use('/sample', sample())
    return router
}

module.exports = service