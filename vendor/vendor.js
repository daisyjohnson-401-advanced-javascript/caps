'use strict';

require('dotenv').config();

const faker = require('faker');

const io = require('socket.io-client');

const vendorSocket = io.connect('http://localhost:3000/caps');

vendorSocket.emit('join', process.env.STORE_NAME);

function start(){
setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: process.env.STORE_NAME || '1-206-flowers',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
  };

  vendorSocket.emit('pickup', order);
}, 5000);

}

vendorSocket.on('delivered', (payload) => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});

module.exports = { start };  