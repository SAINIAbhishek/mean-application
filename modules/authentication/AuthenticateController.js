'use strict';

const MODELS = require('../../ApiModels');
const UserModel = MODELS.User;
const passport = require('passport');

class AuthenticateController {

    static login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        UserModel.findOne({username: username}, (err, user) => {
            if (err) {
                console.error(err.message);
                throw err
            }

            if (!user) return res.status(404).send({success: false, msg: 'The user could not be found.'});

            user.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }

                if (isMatch) {
                    const token = user.generateToken();
                    res.status(200).send({
                        success: true,
                        token: 'JWT ' + token,
                        user: user.toSend(),
                        msg: 'The user has been logged in.'
                    });
                } else {
                    return res.status(404).send({success: false, msg: 'The username or password is not correct.'});
                }
            })
        });

    }

    static isAuthenticated(req, res, next) {
        passport.authenticate('jwt', {session:false}, (err, _) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
            next();
        });
    }

}

module.exports = AuthenticateController;
