'use strict';

const EventEmitter = require('events');

// The event pool
const events = new EventEmitter();

// Becuase we export the pool of events, any module
// that "requires" this one will get the same event pool
// This therefore acts like a global
// Technically, this is exporting a single instance of Events
// We call this a "singleton"

// Register event listeners
module.exports = events;