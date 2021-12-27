require('dotenv/config');
const express = require('express');
require('express-async-errors')


const configureEnvironment = require('./config/dotenvConfig');
const routes = require('./routes');
const MongoAdapter = require('./adapters/mongodbAdapter');
const swagger = require('./routes/swaggerRoute');
const errorHandler = require('./middlewares/errorHandler')

class App {
  constructor() {
    this.server = express();
    configureEnvironment();
    this.middlewares();
    this.routes();
    this.errorHandler();
    MongoAdapter.connect();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(swagger);
  }

  routes() {
    this.server.use(routes);
  }

  errorHandler() {
    this.server.use(errorHandler)
  }
}

module.exports = new App().server;
