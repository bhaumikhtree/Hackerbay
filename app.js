const express = require('express');

const app = express();
const morgan = require('morgan');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const authRoutes = require('./api/routes/auth');
const serviceRoutes = require('./api/routes/service');

app.use(express.static('public'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Create a write stream
const accessLogStream = fs.createWriteStream('access.log', {
  flags: 'a',
});
app.use(logger('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use('/login', authRoutes);
app.use('/service', serviceRoutes);
module.exports = app;
