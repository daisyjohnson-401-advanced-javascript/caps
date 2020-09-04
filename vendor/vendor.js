'use strict';

require('dotenv').config();

// const faker = require('faker');
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

const storeName = '1-206-flowers'

socket.emit('join', storeName);

socket.on('delivered', (payload) => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});

// IF(MODULE.PARENT)
// // function start(){
// setInterval(() => {
//   const order = {
//     store: storeName,
//     orderID: faker.random.number(),
//     customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
//     address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
//   };

//   socket.emit('pickup', order);
// }, 5000);

// }



// start();

// module.exports = { start };  