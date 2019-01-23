const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res, next) => {
  db.query('SELECT * from menu', (err, menuItems) => {
    if(err) throw err;

    res.render('lab', {
      menuItems,
      activeMenuIndex: 1,
    });
  });
});

module.exports = router;