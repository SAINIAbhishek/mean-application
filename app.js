'use strict';

// modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config/db');
const Authentication = require('./modules/authentication/Authentication');

// loading models in Mongoose
require('./ApiModels');

const appBoot = () => {

    // connect db initialization
    const mongoParams = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }

    // connection
    mongoose.connect(dbConfig.database, mongoParams).then(() => {
        console.info('Connected to the MongoDB.');
    }).catch((ex) => {
        console.error('---Database connector error---: ' + ex.message);
        process.exit(1);
    });

    // application port number
    const port = 3000;
    const app = express();

    // setting the app router and static folder
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        limit: '15mb',
        extended: true
    }));

    // parse application/json
    app.use(bodyParser.json());

    // passport middleware
    Authentication.initializePassport(app);

    // authenticated routes
    app.use('/api', require('./ApiRoutes'));

    app.listen(port, () => {
        console.info('Server is listening on the port: ' + port);
    });

}

try {
    appBoot();
} catch (e) {
    console.error(e.message);
}

