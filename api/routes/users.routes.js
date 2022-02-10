/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */
const router = require('express').Router();
const user = require('../services/users.service');


/** Get all users */
router.get('/', user.getAllUsers);

/** Get user by id */
router.get('/:username', user.getUserByUsername);

/** Create a new user */
router.post('/', user.createUser);

/** Update user by id */
router.put('/:username', user.updateUser);

module.exports = router;