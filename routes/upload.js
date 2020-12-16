const express = require('express');

const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

function makeResponse({ path }) {
  const host = process.env.API_HOST || '';

  return {
    url: `${host}${path.replace('public/', '/')}`,
  };
}

router.post('/', upload.single('upload'), (req, res) => {
  res.send(makeResponse({ path: req.file.path }));
});

module.exports = router;
