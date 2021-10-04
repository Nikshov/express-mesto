const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../constants/unauthorizedError');
const ForbiddenError = require('../constants/forbiddenError');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw new ForbiddenError('Необходима авторизация');
  // }

  // const token = authorization.replace('Bearer ', '');
  const { token } = req.cookies;
  if (!token) {
    throw new ForbiddenError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
