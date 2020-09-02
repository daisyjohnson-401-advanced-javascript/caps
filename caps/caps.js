'use strict';

const net = require('net');
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = net.createServer();
//Accept inbound TCP connections on a declared port
server.listen(port, () => console.log(`Server up on ${port}`));

//On new connections, add the client to the connection pool

//Creates a pool of connected clients
let socketPool = {};

server.on('connection', (socket) => {
  // random id number for client
  const id = `Socket-${Math.random()}`;
  // add them to pool
  socketPool[id] = socket;

  // WHEN EVENTS COME IN VERIFY DATA IS LEGIT PARSE IT
  socket.on('data', (buffer) => dispatchEvent(buffer));

  socket.on('end', (e) => { delete socketPool[id]; });


});

server.on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());

  broadcast(message);
  logIt(message);
}

//If the payload is ok, broadcast the raw data back out to each of the other connected clients
function broadcast(message){
  let payload = JSON.stringify(message);
  for(let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}


// LOG IT METHOD

function logIt(message){
  const messageThing = JSON.parse(message);

  const eventThing = messageThing.event;
  const time = new Date();
  const payload = messageThing.payload;


  console.log('EVENT', {event: eventThing, time, payload});
};



module.exports = server;
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