const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const Service = require('./src/service');
require('dotenv').config()

const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Define a route
app.use('/api/',Service())

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});