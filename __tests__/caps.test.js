jest.useFakeTimers();
const emitter = require('../lib/events.js');
require('../caps/caps.js');

const delivery = {
  store: '1-206-flowers',
  orderID: '1234',
  customer: 'tester testerooni',
  address: '123 Nowhere Lane',
};

it.skip('should log pickup', () => {

  console.log = jest.fn();

  emitter.emit('pickup', delivery);

  
  expect(console.log).toHaveBeenLastCalledWith("EVENT",
    expect.objectContaining({event:'pickup'}));

});

it.skip('should log in-transit', () => {

  console.log = jest.fn();

  emitter.emit('in-transit', delivery);

  expect(console.log).toHaveBeenLastCalledWith("EVENT", expect.objectContaining({event:'in-transit'}));

});

it.skip('should log delivered', () => {

  console.log = jest.fn();

  emitter.emit('delivered', delivery);

  expect(console.log).toHaveBeenLastCalledWith("EVENT", expect.objectContaining({event:'delivered'}));

});
