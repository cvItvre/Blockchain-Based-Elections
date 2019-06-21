const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const Router = require('./src/routes');

const server = express();
server.use(cors());
server.use(morgan('dev'));

server.use(bodyParser.json());

server.use('/api', Router);

server.listen(3001);
