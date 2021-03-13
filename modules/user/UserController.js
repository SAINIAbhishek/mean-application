'use strict';

const MODELS = require('../../ApiModels');
const UserModel = MODELS.User;
const _ = require('lodash');
const bcrypt = require('bcrypt');

class UserController {

    // create
    static async create(req, res) {
        try {
            let user = await UserModel.findOne({ email: req.body.email });
            if (user) return res.status(400).send({success: false, msg: 'User already registered.'});

            user = new UserModel(_.pick(req.body, ['name', 'email', 'password', 'username']));

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save();
        } catch (e) {
            console.error(e.message);
            return res.status(400).send({
                success: false,
                msg: 'There were some technical issues to carry out this request.'
            });
        }
    }

    // get user by id
    static async get(req, res) {
        const user = await UserModel.find({ _id: req.params.id });
        if (!user) return res.status(404).send({success: false, msg: 'The user could not be found.'});
        res.send(user);
    }

    // get user by username
    static async getByUsername(req, res) {
        const user = await UserModel.findOne({ username: req.params.username});
        if (!user) return res.status(404).send({success: false, msg: 'The user could not be found.'});
        res.send(user);
    }

}

module.exports = UserController;
