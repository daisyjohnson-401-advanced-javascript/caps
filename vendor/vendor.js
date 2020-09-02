'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');
const server = require('../caps/caps.js')

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log(`connected on socket server`);
});

/*

Connect to the CAPS server
Every 5 seconds, simulate a new customer order
Create an order object with your store name, order id, customer name, address
HINT: Have some fun by using the faker library to make up phony information
Create a message object with the following keys:
event - ‘pickup’
payload - the order object you created in the above step
Write that message (as a string) to the CAPS server
Listen for the data event coming in from the CAPS server
When data arrives, parse it (it should be JSON) and look for the event property
If the event is called delivered
Log “thank you for delivering id” to the console
Ignore any data that specifies a different event
*/

let storeName = '1-206-flowers';



setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: process.env.STORE_NAME,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()},${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
  };
  socket.write(JSON.stringify({ event: 'pickup', content: order}));
  
}, 5000);


socket.on('data', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);
})

// }
//Whenever the ‘delivered’ event occurs
//Log “thank you” to the console
if( jsonPayload.event === 'delivered'){
  console.log(
    `Thank you for delivering ${payload.orderID}`
  )
};

module.exports = { start };