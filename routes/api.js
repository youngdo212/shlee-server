const db = require('../lib/db');
const express = require('express');
const router = express.Router();

router.get('/project', (req, res, next) => {
  db.query('SELECT * FROM project', (err, projects) => {
    if(err) throw err;

    res.send(projects);
  });
});

module.exports = router;