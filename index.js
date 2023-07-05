const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const Service = require('./src/service');
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT;

// Define a route
app.use('/api/',Service())

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});