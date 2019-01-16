const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');

router.get('/:id', (req, res) => {
  const projectId = req.params.id;

  db.query('SELECT title, header_image_url as headerImageUrl, client, agency, role, snapshot_column as snapshotColumn FROM project WHERE id = ?', [projectId], (err, projects) => {
    if(err) throw err;

    const project = projects[0];

    db.query('SELECT video_url as videoUrl from video WHERE project_id = ?', [projectId], (err, videos) => {
      if(err) throw err;

      project.videoUrls = videos.map(video => video.videoUrl);

      res.render('project', project);
    });
  });
});

module.exports = router;