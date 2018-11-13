var express = require('express');
var router = express.Router();
var finance = require('@riouxjean/test');



/* GET users listing. */
router.post('/', function(req, res, next) {
  var call = async () => {
    var position = await finance(req.body.ticker);
    await res.render('result', {
      vti: position.vti,
      ticker: req.body.ticker/*,
      x7: position.x7,
      x6: position.x6,
      x5: position.x5,
      x4: position.x4,
      x3: position.x3,
      x2: position.x2,
      x1: position.x1*/,
      eps: position.eps,
      shareprice: position.shareprice,
      pe: position.pe,
      pb: position.pb,
      ps: position.ps,
      pc: position.pc,
      de: position.de,
      eg: position.eg,
      pr: position.payout,
      y: position.yield
     });
  }
  call();
});

module.exports = router;
