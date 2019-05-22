const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan());

server.get('/teste', (req, res) => {
  res.send('Hello World');
});

server.listen(3000);
