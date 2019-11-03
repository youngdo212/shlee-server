const express = require('express');

const router = express.Router();
const auth = require('../lib/auth');

router.get('/', (req, res) => {
  if (!auth.isAuthorized(req)) {
    res.redirect('/auth/login');
    return;
  }

  const { nickname } = req.session;
  res.render('dashboard', { nickname });
});

module.exports = router;
