const db = require('../lib/db');
const express = require('express');
const router = express.Router();

router.get('/project', (req, res, next) => {
  const {limit, offset, category} = req.query;
  const whereClause = category ? `WHERE category = ${db.escape(category)}` : '';
  const limitClause = `LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
  const sql = `SELECT id, title, thumbnail_image_url as thumbnailImageUrl, video_url as videoUrl FROM project ${whereClause} ${limitClause}`;

  db.query(sql, (err, projects) => {
    if(err) throw err;

    res.send(projects);
  });
});

router.get('/project/:id', (req, res) => {
  const projectId = Number(req.params.id);

  db.query('SELECT id, title, thumbnail_image_url as thumbnailImageUrl, video_url as videoUrl, header_image_url as headerImageUrl, client, agency, role from project WHERE id = ?', [projectId], (err, results) => {
    if(err) throw err;

    const project = results[0];
    res.send(project);
  });
});

router.get('/project/snapshot/:id', (req, res, next) => {
  const projectId = Number(req.params.id);
  const {limit, offset} = req.query;

  db.query('SELECT image_url as imageUrl FROM snapshot WHERE project_id = ? LIMIT ? OFFSET ?', [projectId, Number(limit), Number(offset)], (err, images) => {
    if(err) throw err;

    res.send(images);
  });
});

module.exports = router;