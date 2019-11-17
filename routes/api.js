const db = require('../lib/db');
const express = require('express');
const router = express.Router();

router.get('/project', (req, res, next) => {
  const {limit, offset, category} = req.query;
  const whereClause = category ? `WHERE category = ${db.escape(category)}` : '';
  const limitClause = `LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
  const orderClause = `ORDER BY id DESC`;
  const sql = `SELECT id, title, thumbnail_image_url as thumbnailImageUrl, quick_view_url as quickViewUrl FROM project ${whereClause} ${orderClause} ${limitClause}`;

  db.query(sql, (err, projects) => {
    if(err) throw err;

    res.send(projects);
  });
});

router.get('/project/:id', (req, res) => {
  const projectId = Number(req.params.id);

  db.query('SELECT id, title, thumbnail_image_url as thumbnailImageUrl, quick_view_url as quickViewUrl, header_image_url as headerImageUrl, client, agency, role from project WHERE id = ?', [projectId], (err, results) => {
    if(err) throw err;

    const project = results[0];
    res.send(project);
  });
});

router.get('/project/:id/snapshot', (req, res, next) => {
  const projectId = Number(req.params.id);
  const {limit, offset} = req.query;

  db.query('SELECT image_url as imageUrl FROM snapshot WHERE project_id = ? LIMIT ? OFFSET ?', [projectId, Number(limit), Number(offset)], (err, images) => {
    if(err) throw err;

    res.send(images);
  });
});

module.exports = router;