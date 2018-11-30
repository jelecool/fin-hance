var express = require('express');
var router = express.Router();
var finance = require('@riouxjean/test');
var Position = require('../models/position')


function toPercent(num) {
  var percent_c = num * 100;
  var percent = Math.round(percent_c * 100) / 100
  var string = percent.toString() + "%";
  return string;
}

function getDate() {
  let d = new Date();
  let f = d.toISOString();
  let a = f.split("T");
  let a2 = a[1].split(".");
  let formatted = `${a[0]} ${a2[0]}`
  console.log(`Moitié #1: ${a[0]} Moitié #2: ${a[1]}`);
  return formatted;
}


/* GET users listing. */
router.post('/', function(req, res, next) {
  var call = async () => {
    var position = await finance(req.body.ticker);
    Position.find({author: req.session.userId}, function(err,docs){
      array = docs;
    });
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
      x1: position.x1,
      author: req.session.userId,
      date: getDate()
     }

    await Position.create(position_data, function (err, position_data) {
      if (err) {
        console.log(err);
      } else {
        Position.find({author: req.session.userId}, function(err,docs){
          res.render('protected_result', {position: position_data, positions: docs});
        });
      }
    });


  }
  call();
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