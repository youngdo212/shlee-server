const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../lib/auth');

router.get('/', (req, res) => {
  if(!auth.isAuthorized(req)) {
    res.redirect('/auth/login');
    return;
  }

  const nickname = req.session.nickname;

  db.query('SELECT * FROM PROJECT', (error, projects) => {
    if(error) throw error;

    res.render('dashboard', {projects, nickname});
  });
})

module.exports = router;