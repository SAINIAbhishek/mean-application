'use strict';

const router = require('express').Router();
const UserController = require('./UserController');

router.route('/:id')
    .get(UserController.get)

router.route('/:username')
    .get(UserController.getByUsername)

router.route('/register')
    .post(UserController.create)

router.route('/profile')
    .get()

module.exports = router;
