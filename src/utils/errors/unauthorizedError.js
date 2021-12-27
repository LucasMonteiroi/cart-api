const { StatusCodes } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
