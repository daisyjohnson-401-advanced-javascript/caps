'use strict';

/*
Connect to the CAPS server
Listen for the data event coming in from the CAPS server
When data arrives, parse it (it should be JSON) and look for the event property and begin processing…
If the event is called pickup
Simulate picking up the package
Wait 1 second
Log “picking up id” to the console
Create a message object with the following keys:
event - ‘in-transit’
payload - the payload from the data object you just received
Write that message (as a string) to the CAPS server
Simulate delivering the package
Wait 3 seconds
Create a message object with the following keys:
event - ‘delivered’
payload - the payload from the data object you just received
Write that message (as a string) to the CAPS server
*/

const emitter = require('../lib/events.js');

// monitor pickup for event
emitter.on('pickup', inTransitHandler);
emitter.on('in-transit', deliveredHandler);

function inTransitHandler(order){

// WAIT 1 SECOND
setTimeout(() => {

  console.log(`DRIVER: picked up ${order.orderID}`);
//Log “DRIVER: picked up [ORDER_ID]” to the console.
//Emit an ‘in-transit’ event with the payload you received

  emitter.emit('in-transit', order);
}, 1000);

}



function deliveredHandler(delivery) {
  // AFTER 3 SECONDS
setTimeout(() => {

//Log “delivered” to the console
//Emit a ‘delivered’ event with the same payload
console.log(`DRIVER: delivered ${delivery.orderID}`);
 emitter.emit('delivered', delivery); 
}, 5000);

}

