'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/db');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.comparePassword = function(enteredPassword, hashPassword, callback) {
    bcrypt.compare(enteredPassword, hashPassword, (err, isMatch) => {
        if (err) {
            console.error(err.message);
            throw err;
        }
        callback(null, isMatch);
    });
};

UserSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, email: this.email}, config.secret, {
        expiresIn: 60400 // 1 week
    });
}

UserSchema.methods.toSend = function () {
    return {
        id: this._id,
        username: this.username,
        name: this.name,
        email: this.email
    };
}

module.exports = UserSchema;
