const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

router.get('/login', (req, res, next) => {
  if(auth.isAuthorized(req)) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
})

router.post('/login', (req, res, next) => {
  const user = auth.getUser(req);

  if(!user) {
    res.render('login', {failed: true});
    return;
  }

  req.session.authorized = true;
  req.session.nickname = user.nickname;
  req.session.save((err) => {
    if(err) throw err;

    res.redirect('/dashboard');
  });
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) throw err;

    res.clearCookie('connect.sid');
    res.redirect('/');
  });
})

module.exports = router;