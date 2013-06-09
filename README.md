PHPCurlNodeSocket
=================

PHPCurlNodeSocket is an example application, showing how you might curl the input from a PHP form to an IP/port that Node.js is listening to, and publish the data out with Socket.io. 

Setup
-----

I had my Apache server listening on port 8080, the form curling to port 8000, and socket requests listening to standard port 80. YMMV

1. From the node folder:
 
        npm install socket.io  

2. Copy the socket.io client:

        cp node/node_modules/socket.io/node_modules/socket.io-client/dist/* client/js/socket.io  

3. From the node folder:

        node PHPMonitor.js  

4. Open client/index.html in your browser

5. Copy php/form.php to your Apache server, and open it in your browser:

        http://localhost:8080/form.php    

6.  Enter some data into the form, and see it in index.html