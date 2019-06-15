const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Router = require('./src/routes');

const server = express();
server.use(morgan('dev'));

server.use(bodyParser.json());

server.use('/api', Router);

server.listen(3001);
