'use strict';

const router = require('express').Router();

router.use('/authenticate', require('./modules/authentication/AuthenticateRoutes'));

router.use('/users', require('./modules/user/UserRoutes'));

module.exports = router;
