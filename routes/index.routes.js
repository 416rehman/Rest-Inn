/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const users_endpoints = require('./users.routes').endpoints;
const properties_endpoints = require('./properties.routes').endpoints;
const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
  //pretty print the endpoints
    res.json({
        "status": "Ready",
        "message": "Welcome to the Rest-Inn API by Hayaturehman Ahmadzai",
        "Endpoints": [
            ...users_endpoints,
            ...properties_endpoints
        ]
    });
});

module.exports = router;
