const db = require('../lib/db');
const express = require('express');
const router = express.Router();

router.get('/project', (req, res, next) => {
  const {limit, offset} = req.query;

  db.query('SELECT * FROM project LIMIT ? OFFSET ?', [Number(limit), Number(offset)], (err, projects) => {
    if(err) throw err;

    res.send(projects);
  });
});

module.exports = router;