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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "status": "success",
    "message": "Welcome to the API"
  });
});

module.exports = router;
