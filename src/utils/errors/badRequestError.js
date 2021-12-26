const { StatusCodes } = require('http-status-codes');

class BadRequestError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = new BadRequestError();
