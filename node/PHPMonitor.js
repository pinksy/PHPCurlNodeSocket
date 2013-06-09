var http = require("http");
var url = require("url");
var qs = require("querystring");

// Create an HTTP server for socket.io to listen on
var app = http.createServer();
var io = require("socket.io").listen(app);
app.listen(80);

// Authorised IPs that can cURL to our Node server 
var authorisedIPs = [
'127.0.0.1',
'192.168.0.1'
];

// An array of socket.io clients
var clients = [];

// The handler for cURLs to our Node HTTP server
function handler(req, res){

  var remoteAddress = req.socket.remoteAddress;

  // Only process IPs in our authorised list
  if(authorisedIPs.indexOf(remoteAddress) >= 0) {

    try{
      if(req.method == 'POST'){
        var body = '';

        req.on('error',function(){
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end("Error");
        });

        req.on('data',function(data){
          body += data;

          // Kill the connection if it's too large to handle
          if(body.length > 1e6){
            response.writeHead(413, {'Content-Type': 'text/plain'});
            req.connection.destroy();
          }
        });

        req.on('end',function(){
          var parsedBody = qs.parse(body);
          var json = JSON.stringify(parsedBody);

          // Emit a socket.io message to all current clients
          clients.forEach(function(client) {
            client.emit('data', json);
          });
        });
      }

      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Ok");
    }
    catch(error){
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.end("Error");
    }
  }
  else{
    res.writeHead(401, {"Content-Type": "text/plain"});
    res.end("Unauthorised");
  }
}

io.sockets.on('connection', function(socket){

  // Add new socket.io clients to our clients array
  clients.push(socket);

  // Clean up our clients array when a socket.io client disconnects
  socket.on('disconnect',function(){
    position = clients.indexOf(socket);
    clients.splice(position, 1);
  });
});

// Start listening to cURLs
http.createServer(handler).listen(8000, '127.0.0.1');

console.log('Listening for cURL requests on http://127.0.0.1:8000/');
console.log('Listening for socket.io requests on http://127.0.0.1:80/');