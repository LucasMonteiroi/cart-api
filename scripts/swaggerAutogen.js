const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/resources/swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles);
