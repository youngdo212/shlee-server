const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
})
const upload = multer({storage: storage});

router.get('/:id', (req, res, next) => {
  const projectId = req.params.id;

  db.query('SELECT * FROM menu', (err, menuItems) => {
    if(err) throw err;

    db.query('SELECT title, header_image_url as headerImageUrl, client, agency, role, snapshot_column as snapshotColumn FROM project WHERE id = ?', [projectId], (err, projects) => {
      if(err) throw err;
      if(!projects.length) {
        next(new Error('project id not found'));
        return;
      }
  
      const project = projects[0];
      const {title, headerImageUrl, client, agency, role, snapshotColumn} = project;
  
      db.query('SELECT video_url as videoUrl from video WHERE project_id = ?', [projectId], (err, videos) => {
        if(err) throw err;
  
        const videoUrls = videos.map(video => video.videoUrl);
  
        res.render('project', {
          menuItems,
          title, 
          headerImageUrl, 
          client, 
          agency, 
          role, 
          snapshotColumn,
          videoUrls,
        });
      });
    });
  })
});

router.post('', upload.fields([{name: 'thumbnail'}, {name: 'header-image'}, {name: 'snapshot'}]), (req, res, next) => {
  const snapshotUrls = req.files['snapshot'].map(snapshot => snapshot.path.replace('public/', '/'));
  const videoUrls = req.body['video-url'] instanceof Array ? req.body['video-url'] : [req.body['video-url']];
  const project = {
    'title': req.body['title'],
    'thumbnail_image_url': req.files['thumbnail'][0].path.replace('public/', '/'),
    'quick_view_url': req.body['quick-view-url'],
    'header_image_url': req.files['header-image'][0].path.replace('public/', '/'),
    'client': req.body['client'],
    'agency': req.body['agency'],
    'role': req.body['role'],
    'category': req.body['category'],
    'snapshot_column': req.body['snapshot-column'],
  };
  
  db.query('INSERT INTO project SET ?', project, (err, results) => {
    if(err) throw err;

    const newProjectId = results.insertId;

    db.query('INSERT INTO snapshot (project_id, image_url) VALUES ?', [snapshotUrls.map(snapshotUrl => [newProjectId, snapshotUrl])], (err) => {
      if(err) throw err;

      db.query('INSERT INTO video (project_id, video_url) VALUES ?', [videoUrls.map(videoUrl => [newProjectId, videoUrl])], (err) => {
        if(err) throw err;

        res.redirect(302, '/dashboard');
      });
    });
  });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM project WHERE id = ?', [id], (err) => {
    if(err) throw err;

    res.send();
  })
})

module.exports = router;