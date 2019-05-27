const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3000);
