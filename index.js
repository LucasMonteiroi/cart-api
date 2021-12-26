const app = require('./src/app');

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, console.log(`Listening on port: ${port}`));
