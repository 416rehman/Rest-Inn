const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "status": "success",
    "message": "Welcome to the API"
  });
});

module.exports = router;
