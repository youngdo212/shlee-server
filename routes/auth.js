const express = require('express');

const router = express.Router();
const auth = require('../lib/auth');

/**
 *
 * @param {object} param
 * @param {0 | 1=} param.resultCode
 * @param {string=} param.resultMessage
 * @param {object=} param.data
 */
function makeResponse({
  resultCode = 0,
  resultMessage = '',
  data = null,
} = {}) {
  return {
    resultCode,
    resultMessage,
    data,
  };
}

router.get('/user', (req, res) => {
  let user;

  if (req.session.authorized) {
    user = {
      name: req.session.nickname,
    };
  }

  if (!user) {
    res.send(makeResponse());
    return;
  }

  res.send(
    makeResponse({
      data: user,
    })
  );
});

router.post('/login', (req, res) => {
  const user = auth.getUser(req);

  if (!user) {
    res.send(
      makeResponse({
        resultCode: -1,
        resultMessage: '이메일 또는 비밀번호를 확인하세요',
      })
    );
    return;
  }

  req.session.authorized = true;
  req.session.nickname = user.nickname;
  req.session.save(err => {
    if (err) throw err;

    res.send(
      makeResponse({
        data: { name: user.nickname },
      })
    );
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) throw err;

    res.clearCookie('connect.sid');
    res.send(makeResponse());
  });
});

module.exports = router;
