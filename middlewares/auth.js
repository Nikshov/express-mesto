const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../constants/unauthorizedError');
const ForbiddenError = require('../constants/forbiddenError');

module.exports = (req, res, next) => {
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
