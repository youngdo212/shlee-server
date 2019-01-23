const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM menu', (err, menuItems) => {
    if(err) throw err;

    res.render('info', {
      menuItems,
      activeMenuIndex: 2,
    });
  });
});

module.exports = router;