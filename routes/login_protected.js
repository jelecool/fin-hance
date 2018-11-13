var express = require('express');
var router = express.Router();
var finance = require('@riouxjean/test');

function toPercent(num) {
  var percent_c = num * 100;
  var percent = Math.round(percent_c * 100) / 100
  var string = percent.toString() + "%";
  return string;
}


function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const bearerheader = req.session.token;
  //check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //get access token from string
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else if (typeof bearerheader !== 'undefined') {
      //get access token from string
      const bearerToken = bearerheader;
      req.token = bearerToken;
      next();

  } else {
    res.render('/signin',{message: "NOT AUTHORIZED!"});
  }
}
 
/* GET home page. */
router.get('/', ensureToken, function(req, res, next){
  var user = req.session.user;
  var token = req.session.token;
  var call = async () => {
    var position = await finance(req.body.ticker);
    console.log(position);
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
