'use strict';

const io = require('socket.io-client');


const driverSocket = io.connect('http://localhost:3000/caps');

driverSocket.on('pickup', (payload) => {
// WAIT 1 SECOND
    setTimeout(() => {
     console.log(`picking up ${payload.orderID}`);
      driverSocket.emit('in-transit', payload);
    }, 1500);

    //Wait 3 seconds
    setTimeout(() => {
//Write that message (as a string) to the CAPS server
      console.log(`Delivering ${payload.orderID}`);
      driverSocket.emit('delivered', payload);
    }, 3000);

});
