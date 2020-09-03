'use strict';
// const net = require('net');
require('dotenv').config();
// const server = net.createServer();
// //Accept inbound TCP connections on a declared port
// server.listen(port, () => console.log(`Server up on ${port}`));

const io = require('socket.io')(3000);
// console.log(`Listening on ${process.env.PORT}`)

// NAMESPACE
const caps = io.of('/caps');

caps.on('connection', (socket) => {

  console.log('CAPS ROOM', socket.id);

  socket.on('join', (room) => {
    console.log('joined', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    console.log('PICKUP ORDER', payload);
  });
  socket.on('in-transit', (payload) => {
    caps.to(process.env.STORE_NAME).emit('in-transit', payload);
    console.log('ORDER IN-TRANSIT',payload);
  });
  socket.on('delivered', (payload) => {
    caps.to(process.env.STORE_NAME).emit('delivered', payload);
    console.log('DELIVERED',payload);
  });
});








//Creates a pool of connected clients
// let socketPool = {};

// io.on('connection', (socket) => {
//   console.log('CONNECTED to socket', socket.id);
//   // random id number for client
//   const id = `Socket-${Math.random()}`;
//   // add them to pool
//   socketPool[id] = socket;

//   socket.on('pickup', (payload) => {
//     io.emit('pickup', payload);
//   });
//   socket.on('in-transit', (payload) => {
//     io.emit('in-transit', payload);
//   });
//   socket.on('delivered', (payload) => {
//     io.emit('delivered', payload);
//   });
// //   // WHEN EVENTS COME IN VERIFY DATA IS LEGIT PARSE IT
// //   socket.on('data', (buffer) => dispatchEvent(buffer));

// //   socket.on('end', (e) => { delete socketPool[id]; });
// // });
//   for(let eventName of events){
//     registerEvent(socket, eventName);
//   }
// // server.on('error', (e) => {
// //   console.error('SERVER ERROR', e.message);
// });





// function dispatchEvent(buffer) {
//   let message = JSON.parse(buffer.toString().trim());
// function registerEvent(socket, eventName) {
//   socket.on(eventName, (payload) => {
//     logIt(eventName, payload);
//     io.emit(eventName, payload);
//   });
// }
//   broadcast(message);
//   logIt(message);
// }

//If the payload is ok, broadcast the raw data back out to each of the other connected clients
// function broadcast(message) {
//   let payload = JSON.stringify(message);
//   for (let socket in socketPool) {
//     socketPool[socket].write(payload);
//   }
// }



// LOG IT METHOD

// function logIt(eventName, payload) {
//   const messageThing = JSON.parse(message);

//   // const eventThing = messageThing.event;
//   // const time = new Date();
//   // const payload = messageThing.payload;


//   console.log(eventName, payload.review);
// };




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