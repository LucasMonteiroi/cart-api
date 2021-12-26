const { StatusCodes } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = new UnauthorizedError();
