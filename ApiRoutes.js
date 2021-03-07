'use strict';

const router = require('express').Router();

router.use('/user', require('./modules/user/UserRoutes'));

module.exports = router;
