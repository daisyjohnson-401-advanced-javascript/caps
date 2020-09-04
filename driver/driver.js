'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

socket.emit('getall');

socket.on('pickup', (payload) => {

  socket.emit('received', payload.orderID)
// WAIT 1 SECOND
    setTimeout(() => {
     console.log(`DRIVER: picked up ${payload.orderID}`);
     socket.emit('in-transit', payload);
    }, 2000);

    //Wait 3 seconds
    setTimeout(() => {
//Write that message (as a string) to the CAPS server
      console.log(`DRIVER: delivered ${payload.orderID}`);
      socket.emit('delivered', payload);
    }, 3000);

});
