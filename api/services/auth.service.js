const jwt = require('jsonwebtoken');
const User = require('../models/user/user.methods')
const {loginValidation} = require("../helpers/user-validation");
const bcrypt = require("bcrypt");

/**
 * Receives the user's login credentials and returns the user's refresh token from the DB.
 * @param req
 * @param res
 */
module.exports.login = (req, res) => {
    loginValidation.validateAsync(req.body).then(body => {
        User.getByEmail(body.email, false).then(user => {
            if (!user) {
                res.status(400).json({
                    message: "Authentication failed",
                    error: "User not found"
                });
            } else {
                bcrypt.compare(body.password, user.password).then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({
                            message: "Authentication failed",
                            error: "Invalid credentials"
                        });
                    } else {
                        res.json({
                            message: "Authentication successful",
                            data: user
                        });
                    }
                });
            }
        });
    }).catch(err => {
        res.status(400).json({
            message: "Authentication failed",
            error: err.message
        });
    });
}

/**
 * Use with the authRefreshToken middleware to refresh the user's token.
 *
 * @param req
 * @param res
 */
module.exports.renewAccessToken = (req, res) => {
    if (!req.user) {
        res.status(401).json({
            message: "Authentication failed",
            error: "Use the authRefreshToken middleware before processing this request"
        });
    } else {
        const user = req.user;
        const PAYLOAD = {
            id: user.id,
            username: user.username,
            role: user.role,
        }

        const accessToken = jwt.sign(PAYLOAD, process.env.SECRET, {
            expiresIn: '5m'
        });

        res.json({
            message: "Access token generated",
            data: {
                accessToken,
                user
            }
        });
    }
}