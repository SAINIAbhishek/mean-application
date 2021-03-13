'use strict';

const router = require('express').Router();
const AuthenticateController = require('../authentication/AuthenticateController');

router.route('/login')
    .post(AuthenticateController.login);

module.exports = router;
