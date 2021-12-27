const { StatusCodes } = require('http-status-codes');

class UnprocessableEntityError extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = UnprocessableEntityError;
