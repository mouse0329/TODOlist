import express from "express";
var router = express.Router();
var m;

/* GET users listing. */
router.get('/', function(req, res, next) {
  m =+1;
  res.send('ここに猫はいません。'+m);
});

module.exports = router;
