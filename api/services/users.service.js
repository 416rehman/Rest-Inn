/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const User = require('../models/user.model.js');
const {newUserValidation, existingUserValidation, usernameCondition} = require('../helpers/user-validation');


/**
 * Get all users
 */
const getAllUsers = async function(req, res) {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Error getting users",
            error: err
        });
    }
};


/**
 * Gets a user object with the given username.
 */
const getUserByUsername = async function (req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        console.log(username);
        User.getByUsername(username).then(user => {
            if (user) {
                res.status(200).json({
                    message: 'User Retrieved!',
                    data: user
                });
            } else {
                res.status(404).json({
                    message: 'User Not Found!'
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Failed to Get User!',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid Username!',
            error: err
        });
    });
};

/**
 * Creates a new user object.
 */
const createUser = async function (req, res) {
    newUserValidation.validateAsync(req.body).then(sanitized => {
        User.addUser(sanitized).then(user => {
            res.status(201).json({
                message: 'User Created!',
                data: user
            });
        }).catch(err => {
            res.status(500).json({
                message: err.code === 11000 ? 'User already exists!' : 'Internal Server Error!',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid Username!',
            error: err
        });
    });
}

const updateUser = (req, res) => {
    usernameCondition.validateAsync(req.params.username).then(username => {
        existingUserValidation.validateAsync(req.body).then(sanitized => {
            User.updateUser(username, sanitized).then(user => {
                if (user) {
                    res.status(200).json({
                        message: 'User Updated!',
                        data: user
                    });
                } else {
                    res.status(404).json({
                        message: 'User Not Found!'
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    message: 'Failed to Update User!',
                    error: err
                });
            });
        }).catch(err => {
            res.status(400).send({
                message: "Invalid User Data!",
                error: err
            });
        });
    }).catch(err => {
        res.status(400).send({
            message: "Invalid Username",
            error: err
        });
    });
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser
};