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
    'header',
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
    'sort_index',
  ];
  const query = `SELECT ${fields.join()} FROM project LEFT JOIN snapshot ON project.id = snapshot.project_id LEFT JOIN video ON project.id = video.project_id WHERE temp IS false ORDER BY sort_index, id desc`;

  db.query(query, (err, projects) => {
    if (err) throw err;

    const savedProjects = [];

    projects.forEach(project => {
      const targetProject = savedProjects.find(
        savedProject => savedProject.id === project.id
      );

      if (targetProject) {
        const { snapshotUrls, videoUrls } = targetProject;
        const { snapshotUrl, videoUrl } = project;

        if (snapshotUrl && snapshotUrls.indexOf(snapshotUrl) === -1)
          snapshotUrls.push(project.snapshotUrl);
        if (videoUrl && videoUrls.indexOf(videoUrl) === -1)
          videoUrls.push(project.videoUrl);
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

    db.query(
      'SELECT title, header, header_image_url as headerImageUrl, client, agency, role, snapshot_column as snapshotColumn FROM project WHERE id = ?',
      [projectId],
      (err1, projects) => {
        if (err1) throw err1;
        if (!projects.length) {
          next(new Error('project id not found'));
          return;
        }

        const project = projects[0];
        const {
          title,
          header,
          headerImageUrl,
          client,
          agency,
          role,
          snapshotColumn,
        } = project;

        db.query(
          'SELECT video_url as videoUrl from video WHERE project_id = ?',
          [projectId],
          (err2, videos) => {
            if (err2) throw err2;

            const videoUrls = videos.map(video => video.videoUrl);

            res.render('project', {
              menuItems,
              title,
              header,
              headerImageUrl,
              client,
              agency,
              role,
              snapshotColumn,
              videoUrls,
            });
          }
        );
      }
    );
  });
});

function queryPromise(sqlString, values) {
  return new Promise(resolve => {
    db.query(sqlString, values, error => {
      resolve(error);
    });
  });
}

router.post('', (req, res) => {
  db.query('INSERT INTO project VALUES ()', (err, results) => {
    if (err) throw err;

    const newProjectId = results.insertId;

    res.send({
      id: newProjectId,
    });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const values = {
    thumbnail_image_url: req.body.thumbnailImageUrl,
    title: req.body.title,
    header: req.body.header,
    quick_view_url: req.body.quickViewUrl,
    client: req.body.client,
    agency: req.body.agency,
    role: req.body.role,
    category: req.body.category,
    header_image_url: req.body.headerImageUrl,
    snapshot_column: req.body.snapshotColumn,
    temp: false,
  };
  const { videoUrls, snapshotUrls } = req.body;

  db.query('UPDATE project SET ? WHERE id = ?', [values, id], async err => {
    if (err) throw err;

    await queryPromise('DELETE FROM video WHERE project_id = ?', [id]);
    await queryPromise('DELETE FROM snapshot WHERE project_id = ?', [id]);

    if (videoUrls.length) {
      await queryPromise('INSERT INTO video (project_id, video_url) VALUES ?', [
        videoUrls.map(videoUrl => [id, videoUrl]),
      ]);
    }

    if (snapshotUrls.length) {
      await queryPromise(
        'INSERT INTO snapshot (project_id, image_url) VALUES ?',
        [snapshotUrls.map(snapshotUrl => [id, snapshotUrl])]
      );
    }

    const fields = [
      'id',
      'title',
      'header',
      'thumbnail_image_url AS thumbnailImageUrl',
      'quick_view_url AS quickViewUrl',
      'header_image_url AS headerImageUrl',
      'client',
      'agency',
      'role',
      'category',
      'snapshot_column AS snapshotColumn',
      'sort_index',
    ];

    db.query(
      `SELECT ${fields.join()} FROM project WHERE id = ?`,
      [id],
      (error3, projects) => {
        if (error3) throw error3;

        const [project] = projects;

        res.send({
          ...project,
          videoUrls,
          snapshotUrls,
        });
      }
    );
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  db.query(
    'SELECT thumbnail_image_url as thumbnailImageUrl, header_image_url as headerImageUrl FROM project WHERE id = ?',
    [id],
    (error, [project]) => {
      if (error) throw error;
      if (!project) return next();

      const { thumbnailImageUrl, headerImageUrl } = project;

      deleteFiles(
        [`public${thumbnailImageUrl}`, `public${headerImageUrl}`],
        error1 => {
          if (error1) throw error1;

          db.query('DELETE FROM project WHERE id = ?', [id], err => {
            if (err) throw err;

            res.send();
          });
        }
      );
    }
  );
});

router.delete('/:id/videos', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM video WHERE project_id = ?', [id], error => {
    if (error) throw error;

    res.send();
  });
});

router.delete('/:id/snapshots', (req, res) => {
  const { id } = req.params;

  db.query(
    'SELECT * FROM snapshot WHERE project_id = ?',
    [id],
    (error, results) => {
      if (error) throw error;
      if (!results.length) return res.send();

      const snapshotUrls = results
        .map(result => result.image_url)
        .map(snapshotUrl => `public${snapshotUrl}`);

      deleteFiles(snapshotUrls, error1 => {
        if (error1) throw error1;

        db.query('DELETE FROM snapshot WHERE project_id = ?', [id], error2 => {
          if (error2) throw error2;

          res.send();
        });
      });
    }
  );
});

router.put('/:id/sort-index', (req, res) => {
  const { id } = req.params;
  const { index } = req.body;

  db.query(
    'UPDATE project SET sort_index = ? WHERE id = ?',
    [index, id],
    error => {
      if (error) throw error;

      res.send();
    }
  );
});

module.exports = router;
