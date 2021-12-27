/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const { InternalServerError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.log('err', err)
  if (!err.data) err = new InternalServerError('Erro interno no servidor.');

  return res.status(err.statusCode).json({
    status: 'error',
    message: err.data.error,
  });
};

module.exports = errorHandler;
