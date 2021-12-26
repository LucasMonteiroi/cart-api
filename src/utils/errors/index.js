const BadRequestError = require('./badRequestError');
const UnauthorizedError = require('./unauthorizedError');
const NotFoundError = require('./notFoundError');
const UnprocessableEntityError = require('./unprocessableEntityError');
const InternalServerError = require('./internalServerError');

module.exports = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  UnprocessableEntityError,
  InternalServerError,
};
