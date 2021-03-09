'use strict';

const router = require('express').Router();

router.use('/users', require('./modules/user/UserRoutes'));

module.exports = router;
