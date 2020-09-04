'use strict';

require('dotenv').config();
const io = require('socket.io')(3000);


const messages = {
  // waiting for messages to queue, sensibly
  pickup: {
    // need to segment by driver as well
    driver: {
      // driver relate messages here by some unique id

    }
  }
}



io.on('connection', (socket) => {
  console.log('CORE', socket.id);
})

// NAMESPACE
const caps = io.of('/caps');

caps.on('connection', (socket) => {

  console.log('Connected to CAPS ROOM', socket.id);

  socket.on('join', (room) => {
    console.log('joined', room);
    socket.join(room);
  });
  // When the driver connects to server they want to get all missed messages
  socket.on('getall', () => {

    for (let id in messages.pickup.driver) {

      const payload = messages.pickup.driver[id];

      caps.emit('pickup', payload)
    }
  });
  socket.on('received', orderID => {
    //delete messages
    //delete messages.pickup.driver[]
    console.log('deleting pre', orderID, messages);

    delete messages.pickup.driver[orderID];

    console.log('deleting post', orderID, messages);
  });

  socket.on('pickup', (payload) => {
    
    // QUEUE PICKUP MESSAGES
    messages.pickup.driver[payload.orderID] = payload;

    logIt('PICKUP ORDER', payload);
    caps.emit('pickup', payload);
  });
  socket.on('in-transit', (payload) => {
    logIt('ORDER IN-TRANSIT', payload);
    caps.to(process.env.STORE_NAME).emit('in-transit', payload);

  });
  socket.on('delivered', (payload) => {
    logIt('DELIVERED', payload);
    caps.to(process.env.STORE_NAME).emit('delivered', payload);

  });


});

function logIt(event, payload) {
  let time = new Date();
  console.log({ time, event, payload });
};
