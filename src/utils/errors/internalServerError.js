const { StatusCodes } = require('http-status-codes');

class InternalServerError extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
