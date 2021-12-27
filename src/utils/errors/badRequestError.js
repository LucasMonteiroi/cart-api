const { StatusCodes } = require('http-status-codes');

class BadRequestError extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
