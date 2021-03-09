'use strict';

const mongoose = require('mongoose');

const MODELS = {
    User: mongoose.model('User', require('./modules/user/UserModel'))
}

module.exports = MODELS;
