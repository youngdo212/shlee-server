const db = require('../lib/db');
const express = require('express');
const router = express.Router();

router.get('/project', (req, res, next) => {
  const {limit, offset} = req.query;

  db.query('SELECT id, title, thumbnail_image_url as thumbnailImageUrl, video_url as videoUrl FROM project LIMIT ? OFFSET ?', [Number(limit), Number(offset)], (err, projects) => {
    if(err) throw err;

    res.send(projects);
  });
});

router.get('/project/:id', (req, res, next) => {
  const projectId = Number(req.params.id);

  db.query('SELECT image_url as imageUrl FROM project_image WHERE project_id = ?', [projectId], (err, images) => {
    if(err) throw err;

    res.send(images);
  });
});

module.exports = router;