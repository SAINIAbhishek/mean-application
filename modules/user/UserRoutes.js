'use strict';

const router = require('express').Router();
const UserController = require('./UserController');
const AuthenticateController = require('../authentication/AuthenticateController');

router.route('/:id')
    .get(AuthenticateController.isAuthenticated, UserController.get)

router.route('/:username')
    .get(AuthenticateController.isAuthenticated, UserController.getByUsername)

router.route('/register')
    .post(UserController.create)

router.route('/profile')
    .get(AuthenticateController.isAuthenticated, UserController.get)

module.exports = router;
