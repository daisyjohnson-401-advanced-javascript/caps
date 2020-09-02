'use strict';

const net = require('net');

const port = process.env.PORT || 3000;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`));

/*

Accept inbound TCP connections on a declared port
On new connections, add the client to the connection pool
On incoming data from a client
Read and parse the incoming data/payload
Verify that the data is legitimate
Is it a JSON object with both an event and payload properties?
If the payload is ok, broadcast the raw data back out to each of the other connected clients
*/
//Creates a pool of connected clients
let socketPool = {};

server.on('connection', (socket) => {
  // random id number for client
  const id = `Socket-${Math.random()}`;
  // add them to pool
  socketPool[id] = socket;

  // WHEN EVENTS COME IN VERIFY DATA IS LEGIT PARSE IT
  socket.on('data', (buffer) => dispatchEvent(buffer));



});

server,on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());

  broadcast(message);
}

//If the payload is ok, broadcast the raw data back out to each of the other connected clients
function broadcast(message){
  let payload = JSON.stringify(message);
  for(let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}
// const events = require("../lib/events");

// // CURRYING
// events.on('pickup', eventHandler('pickup'));
// events.on('in-transit', eventHandler('in-transit'));
// events.on('delivered', eventHandler('delivered'));

// // Not a listener function, doesn't take a payload
// function eventHandler(eventName){
//   return payload => {
//     const time = new Date();

//     console.log('EVENT', {event:eventName, time, payload});
//   }
// };
