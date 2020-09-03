'use strict';

require('dotenv').config();


const io = require('socket.io')(3000);


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
