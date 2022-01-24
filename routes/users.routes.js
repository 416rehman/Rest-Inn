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
const user = require('../services/user.service');

router.get('/', user.getAllUsers);
router.get('/:username', user.getUserByUsername);

router.post('/', user.createUser);

router.put('/:username', user.updateUser);

module.exports = router;
