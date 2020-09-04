'use strict';

const io = require('socket.io-client');
const express = require('express');
const cors = require('cors');
const faker = require('faker');

const socket = io.connect('http://localhost:3000/caps');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 3000;


app.post('/pickup', (req, res) => {
  let order = ( Object.keys(req.body).length && req.body || {
    store: '1-206-flowers',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  });
  socket.emit('pickup', order);
  res.status(200).send('scheduled');
});

app.listen(PORT, () => { });