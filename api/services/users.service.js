/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const User = require('../models/user/user.methods');
const Property = require('../models/property/property.methods');
const {signupValidation, existingUserValidation, usernameCondition, favoriteValidation} = require('../helpers/user-validation');
const {userFilter} = require("../helpers/filters");

/**
 * Get all users
 */
const getAllUsers = async function (req, res) {
    const filter = userFilter(req.query);
    User.getAll(filter).then(users => {
        if (users.length > 0) {
            res.json({
                message: 'Users retrieved successfully',
                data: users
            });
        } else {
            res.status(404).json({
                message: 'No users found',
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error retrieving users',
            error: err.message
        });
    });
};


/**
 * Gets a user object with the given username.
 */
const getUserByUsername = async function (req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        User.getByUsername(username).then(user => {
            if (user) {
                res.json({
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
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error while getting user!',
            error: err.message
        });
    });
};

/**
 * Creates a new user object.
 */
const createUser = async function (req, res) {
    signupValidation.validateAsync(req.body).then(sanitized => {
        User.addUser(sanitized).then(user => {
            res.status(201).json({
                message: 'User Created!',
                data: user
            });
        }).catch(err => {
            res.status(500).json({
                message: err.code === 11000 ? 'User already exists!' : 'Internal Server Error!',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid Username!',
            error: err.message
        });
    });
}

/**
 * Updates a user object with the given username.
 */
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
                        message: 'User Not Found!',
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    message: 'Failed to Update User!',
                    error: err.message
                });
            });
        }).catch(err => {
            res.status(400).send({
                message: "Invalid User Data!",
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).send({
            message: "Validation Error in Username!",
            error: err.message
        });
    });
}

/**
 * Gets users favorite properties.
 */
function getFavorites(req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        User.getFavoriteProperties(username).then(({favorites}) => {
            if (favorites?.properties?.length > 0) {
                res.json({
                    message: 'Favorites retrieved successfully',
                    data: favorites
                });
            } else {
                res.status(404).json({
                    message: 'No favorites found',
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error retrieving favorites',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error while getting favorites!',
            error: err.message
        });
    });
}

/**
 * Adds a property to the user's favorites.
 */
function addFavorite(req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        favoriteValidation.validateAsync(req.params.listingId).then(id => {
            Property.getById(id).then( () => {
                User.getFavoriteProperties(username).then(({favorites}) => {
                    console.log(favorites.properties)
                    if (favorites.properties && favorites.properties.find(fav => fav.listingId.toString() === id)) {
                        res.status(400).json({
                            message: 'Listing already in favorites',
                        });
                    } else {
                        User.addFavoriteProperty(username, id).then(() => {
                            res.status(201).json({
                                message: 'Listing added to favorites',
                                data: {
                                    id: id
                                }
                            });
                        }).catch(err => {
                            res.status(500).json({
                                message: 'Error adding listing to favorites',
                                error: err.message
                            });
                        });
                    }
                }).catch(err => {
                    res.status(500).json({
                        message: 'Error retrieving favorites',
                        error: err.message
                    });
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'Failed to retrieve listing',
                    error: err.message
                });
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Validation Error while adding favorite!',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error while adding favorite!',
            error: err.message
        });
    });
}

/**
 * Removes a property from the user's favorites.
 */
function removeFavorite(req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        favoriteValidation.validateAsync(req.params.listingId).then(id => {
            User.removeFavoriteProperty(username, id).then(() => {
                res.status(200).json({
                    message: 'Listing removed from favorites',
                    data: {
                        id: id
                    }
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'Error removing listing from favorites',
                    error: err.message
                });
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Validation Error while removing favorite!',
                error: err
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error while removing favorite!',
            error: err.message
        });
    });
}

function deleteUser(req, res) {
    usernameCondition.validateAsync(req.params.username).then(username => {
        User.deleteUser(username).then((deleted_user) => {
            if (deleted_user) {
                res.status(200).json({
                    message: 'User deleted',
                    data: deleted_user
                });
            } else {
                res.status(404).json({
                    message: 'User not found',
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: 'Error deleting user',
                error: err.message
            });
        });
    }).catch(err => {
        res.status(400).json({
            message: 'Validation Error while deleting user!',
            error: err.message
        });
    });
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    getFavorites,
    addFavorite,
    removeFavorite,
    deleteUser
};