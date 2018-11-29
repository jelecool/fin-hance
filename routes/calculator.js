var express = require('express');
var router = express.Router();
var finance = require('@riouxjean/test');
var Position = require('../models/position');

function toPercent(num) {
  var percent_c = num * 100;
  var percent = Math.round(percent_c * 100) / 100
  var string = percent.toString() + "%";
  return string;
}


/* GET users listing. */
router.post('/', function(req, res, next) {
  var call = async () => {
    var position = await finance(req.body.ticker);
    //await console.log(position.eg());
    var position_data = await {
      vti: position.vti,
      ticker: req.body.ticker,
      eps: position.eps,
      shareprice: position.shareprice,
      pe: position.pe,
      pb: position.pb,
      ps: position.ps,
      pc: position.pc,
      de: position.de,
      eg: toPercent(position.eg),
      pr: toPercent(position.payout),
      y: toPercent(position.yield),
      x7: position.x7,
      x6: position.x6,
      x5: position.x5,
      x4: position.x4,
      x3: position.x3,
      x2: position.x2,
      x1: position.x1
     }
    //await console.log(position);
    await Position.create(position_data, function (err, position_data) {
      if (err) {
        console.log(err);
      }
    });

    await console.log(`Ligne 47 : "routes/calculator.js | ${position}`);
    await res.render('result', {
      vti: position.vti,
      ticker: req.body.ticker,
      eps: position.eps,
      shareprice: position.shareprice,
      pe: position.pe,
      pb: position.pb,
      ps: position.ps,
      pc: position.pc,
      de: position.de,
      eg: toPercent(position.eg),
      pr: toPercent(position.payout),
      y: toPercent(position.yield)/*,
      x7: position.x7,
      x6: position.x6,
      x5: position.x5,
      x4: position.x4,
      x3: position.x3,
      x2: position.x2,
      x1: position.x1*/
     });
    }
  call();

});

module.exports = router;
