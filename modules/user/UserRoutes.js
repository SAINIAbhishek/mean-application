'use strict';

const router = require('express').Router();

router.route('/register')
    .post();

router.route('/authenticate')
    .post();

router.route('/profile')
    .get();

router.route('/validate')
    .post();

module.exports = router;
