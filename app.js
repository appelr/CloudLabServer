// Require modules
require('dotenv').config();
var express = require('express');
var http = require('http');

// Create express app
var app = express();

var port = process.env.PORT || '3000';
app.set('port', port);

// Configure express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MAX_LENGTH_WORD = 10;

// Route for the frequency counter
app.post('/getWordLengthFrequency', function (req, res) {
	var data = req.body.data;

  console.log("post requested received with data: ");
  console.log(data);
  
  // Create result array and fill it with initial values
  var result = new Array(MAX_LENGTH_WORD);
  result.fill(0);   

  // Transform string to array and values to result
  data.split(" ").forEach(word => {
    var length = word.length;
    result[length - 1] += 1;
  });
  
  // Copy result data in result string
  var resultStr = "";
  for (var i = 0; i < MAX_LENGTH_WORD; i++) {
      resultStr = resultStr + result[i] + " ";
  }

  console.log("sending response");
  res.send(resultStr);
  res.end();
 
})

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
