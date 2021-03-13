'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../../ApiModels').User;
const config = require('../../config/db');

class Authentication {

    static initializePassport(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        try {
            let opts = {};
            opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
            opts.secretOrKey = config.secret;
            passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
                UserModel.findOne({ _id: jwt_payload._id }, (err, user) => {
                    if (err) {
                        console.error(err.message);
                        return done(err, false);
                    }

                    if (user) {
                        return done(null, user);
                    } else {
                        console.info('The user could not be found.');
                        return done(null, false);
                    }
                });
            }));
        } catch (e) {
            console.error(e.message);
        }

    }

}

module.exports = Authentication;
