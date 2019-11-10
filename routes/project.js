const express = require('express');

const router = express.Router();
const multer = require('multer');
const db = require('../lib/db.js');
const { deleteFiles } = require('../lib/helpers.js');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  const fields = [
    'id',
    'title',
    'thumbnail_image_url AS thumbnailImageUrl',
    'quick_view_url AS quickViewUrl',
    'header_image_url AS headerImageUrl',
    'client',
    'agency',
    'role',
    'category',
    'snapshot_column AS snapshotColumn',
    'image_url AS snapshotUrl',
    'video_url AS videoUrl',
  ];
  const query = `SELECT ${fields.join()} FROM project LEFT JOIN snapshot ON project.id = snapshot.project_id LEFT JOIN video ON project.id = video.project_id`;

  db.query(query, (err, projects) => {
    if (err) throw err;

    const savedProjects = [];

    projects.forEach((project) => {
      const targetProject = savedProjects.find((savedProject) => savedProject.id === project.id);

      if (targetProject) {
        const { snapshotUrls, videoUrls } = targetProject;
        const { snapshotUrl, videoUrl } = project;

        if (snapshotUrl && snapshotUrls.indexOf(snapshotUrl) === -1) snapshotUrls.push(project.snapshotUrl);
        if (videoUrl && videoUrls.indexOf(videoUrl) === -1) videoUrls.push(project.videoUrl);
      } else {
        project.snapshotUrls = project.snapshotUrl ? [project.snapshotUrl] : [];
        project.videoUrls = project.videoUrl ? [project.videoUrl] : [];
        delete project.snapshotUrl;
        delete project.videoUrl;
        savedProjects.push(project);
      }
    });

    res.send(savedProjects);
  });
});

router.get('/:id', (req, res, next) => {
  const projectId = req.params.id;

  db.query('SELECT * FROM menu', (err, menuItems) => {
    if (err) throw err;

    db.query('SELECT title, header_image_url as headerImageUrl, client, agency, role, snapshot_column as snapshotColumn FROM project WHERE id = ?', [projectId], (err, projects) => {
      if (err) throw err;
      if (!projects.length) {
        next(new Error('project id not found'));
        return;
      }

      const project = projects[0];
      const {
        title, headerImageUrl, client, agency, role, snapshotColumn,
      } = project;

      db.query('SELECT video_url as videoUrl from video WHERE project_id = ?', [projectId], (err, videos) => {
        if (err) throw err;

        const videoUrls = videos.map((video) => video.videoUrl);

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
  });
});

router.post('', upload.fields([{ name: 'thumbnail' }, { name: 'headerImage' }]), (req, res) => {
  const project = {
    title: req.body.title,
    thumbnail_image_url: req.files.thumbnail[0].path.replace('public/', '/'),
    quick_view_url: req.body.quickViewUrl,
    header_image_url: req.files.headerImage[0].path.replace('public/', '/'),
    client: req.body.client,
    agency: req.body.agency,
    role: req.body.role,
    category: req.body.category,
    snapshot_column: req.body.snapshotColumn,
  };

  db.query('INSERT INTO project SET ?', project, (err, results) => {
    if (err) throw err;

    const newProjectId = results.insertId;

    db.query('SELECT * FROM PROJECT WHERE id = ?', [newProjectId], (error, projects) => {
      if (error) throw error;

      res.send(projects[0]);
    });
  });
});

router.post('/:id/videos', (req, res) => {
  const projectId = req.params.id;
  const { videoUrls } = req.body;

  db.query('INSERT INTO video (project_id, video_url) VALUES ?', [videoUrls.map((videoUrl) => [projectId, videoUrl])], (error) => {
    if (error) throw error;

    res.send();
  });
});

router.post('/:id/snapshots', upload.array('snapshots'), (req, res) => {
  const projectId = req.params.id;
  const snapshots = req.files;
  const snapshotUrls = snapshots.map((snapshot) => snapshot.path.replace('public/', '/'));

  db.query('INSERT INTO snapshot (project_id, image_url) VALUES ?', [snapshotUrls.map((snapshotUrl) => [projectId, snapshotUrl])], (error) => {
    if (error) throw error;

    res.send();
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  db.query('SELECT thumbnail_image_url as thumbnailImageUrl, header_image_url as headerImageUrl FROM project WHERE id = ?', [id], (error, [project]) => {
    if (error) throw error;
    if (!project) return next();

    const { thumbnailImageUrl, headerImageUrl } = project;

    deleteFiles([`public${thumbnailImageUrl}`, `public${headerImageUrl}`], (error) => {
      if (error) throw error;

      db.query('DELETE FROM project WHERE id = ?', [id], (err) => {
        if (err) throw err;

        res.send();
      });
    });
  });
});

router.delete('/:id/videos', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM video WHERE project_id = ?', [id], (error) => {
    if (error) throw error;

    res.send();
  });
});

router.delete('/:id/snapshots', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM snapshot WHERE project_id = ?', [id], (error, results) => {
    if (error) throw error;
    if (!results.length) return res.send();

    const snapshotUrls = results
      .map((result) => result.image_url)
      .map((snapshotUrl) => `public${snapshotUrl}`);

    deleteFiles(snapshotUrls, (error) => {
      if (error) throw error;

      db.query('DELETE FROM snapshot WHERE project_id = ?', [id], (error) => {
        if (error) throw error;

        res.send();
      });
    });
  });
});

router.put('/:id', upload.fields([{ name: 'thumbnail' }, { name: 'headerImage' }]), (req, res, next) => {
  const { id } = req.params;
  const updatedProject = {
    thumbnail_image_url: req.files.thumbnail[0].path.replace('public/', '/'),
    title: req.body.title,
    quick_view_url: req.body.quickViewUrl,
    client: req.body.client,
    agency: req.body.agency,
    role: req.body.role,
    category: req.body.category,
    header_image_url: req.files.headerImage[0].path.replace('public/', '/'),
    snapshot_column: req.body.snapshotColumn,
  };

  db.query('SELECT thumbnail_image_url as thumbnailImageUrl, header_image_url as headerImageUrl FROM project WHERE id = ?', [id], (error, [project]) => {
    if (error) throw error;
    if (!project) return next();

    const { thumbnailImageUrl, headerImageUrl } = project;

    deleteFiles([`public${thumbnailImageUrl}`, `public${headerImageUrl}`], (error) => {
      if (error) throw error;

      db.query('UPDATE project SET ? WHERE id = ?', [updatedProject, id], (error) => {
        if (error) throw error;

        res.send();
      });
    });
  });
});

router.put('/:id/videos', (req, res) => {
  const { id } = req.params;
  const { videoUrls } = req.body;

  db.query('DELETE FROM video WHERE project_id = ?', [id], (error) => {
    if (error) throw error;
    if (!videoUrls.length) return res.send();

    db.query('INSERT INTO video (project_id, video_url) VALUES ?', [videoUrls.map((videoUrl) => [id, videoUrl])], (error) => {
      if (error) throw error;

      res.send();
    });
  });
});

router.put('/:id/snapshots', upload.array('snapshots'), (req, res) => {
  const { id } = req.params;
  const updatedSnapshots = req.files;
  const updatedSnapshotUrls = updatedSnapshots.map((updatedSnapshot) => updatedSnapshot.path.replace('public/', '/'));

  db.query('SELECT * FROM snapshot WHERE project_id = ?', [id], (error, snapshots) => {
    if (error) throw error;

    const snapshotUrls = snapshots.map((snapshot) => `public${snapshot.image_url}`);

    deleteFiles(snapshotUrls, (error) => {
      if (error) throw error;

      db.query('DELETE FROM snapshot WHERE project_id = ?', [id], (error) => {
        if (error) throw error;
        if (!updatedSnapshotUrls.length) return res.send();

        db.query('INSERT INTO snapshot (project_id, image_url) VALUES ?', [updatedSnapshotUrls.map((updatedSnapshotUrl) => [id, updatedSnapshotUrl])], (error) => {
          if (error) throw error;

          res.send();
        });
      });
    });
  });
});

module.exports = router;
