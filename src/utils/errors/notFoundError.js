const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = new NotFoundError();
