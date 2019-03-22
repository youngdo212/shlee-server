const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM PROJECT', (error, projects) => {
    if(error) throw error;

    res.render('dashboard', {projects});
  });
})

module.exports = router;