// Require modules
require('dotenv').config();
var express = require('express');
var path = require('path');
var http = require('http');
var indexRouter = require('./server/routes/index');
var calcRouter = require('./server/routes/calc');

// Create express app
var app = express();

var port = process.env.PORT || '8080';
app.set('port', port);

// Configure express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Add express routes
app.use('/', indexRouter);
app.use('/calc', calcRouter);

// Create and start server
var server = http.createServer(app);
server.listen(port);

// Handle server connection
server.on('listening', _ => {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

// Handle server errors
server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
});
