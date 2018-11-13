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
    var position_data = {
      vti: await position.vti,
      ticker: req.body.ticker,
      eps: await position.eps,
      shareprice: await position.shareprice,
      pe: await position.pe,
      pb: await position.pb,
      ps: await position.ps,
      pc: await position.pc,
      de: await position.de,
      eg: toPercent(await position.eg),
      pr: toPercent(await position.payout),
      y: toPercent(await position.yield)
    }
    Position.create(position_data, function (error, position) {
      if (error) {
        return next(error);
      } else {
        req.session.position = position;
        res.render('result', position_data);
      }
    });
  call();
  }
});

module.exports = router;

/*var positionData = {
  email: req.body.email,
  username: req.body.username,
  password: req.body.password
}
//console.log(User);
//Crer une row dans la collection avec les userData
User.create(positionData, function (error, position) {
  if (error) {
    return next(error);
  } else {
    req.session.position = position;
    //console.log("ok");
    return  res.redirect('/protected');
  }
});*/