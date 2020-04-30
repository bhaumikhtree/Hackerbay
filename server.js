const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on port', port);
});
