const users = [
  {
    email: 'string',
    password: 'string',
    nickname: 'string',
  }
]

exports.isAuthorized = function(req) {
  if(req.session.authorized) return true;

  return false;
}

exports.getUser = function(req) {
  const {email, password} = req.body;
  let foundUser = null;

  users.some((user) => {
    if(user.email !== email || user.password !== password) return false;

    foundUser = user;
    return true;
  });

  return foundUser;
}