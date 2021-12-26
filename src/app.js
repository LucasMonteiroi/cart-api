require('dotenv/config');
const express = require('express');

const configureEnvironment = require('./config/dotenvConfig');
const routes = require('./routes');
const MongoAdapter = require('./adapters/mongodbAdapter');
const swagger = require('./routes/swaggerRoute');

class App {
  constructor() {
    this.server = express();
    configureEnvironment();
    this.middlewares();
    this.routes();
    MongoAdapter.connect();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(swagger);
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
