var express = require('express');
var router = express.Router();


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
  return res.render('protected', { name: req.session.user.username });
});

module.exports = router;
