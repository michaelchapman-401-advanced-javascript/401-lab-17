'use strict';

const net = require('net');
const events = require('./events.js');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in app.js created!'));

client.on('data', (buffer) => {
  let data = buffer.toString().trim();
  data = JSON.parse(data);
  
  if (data.name === 'error') {
    events.emit('registerError', data);
  } else if (data.name === 'save') {
    events.emit('registerSave', data);
  }
});

/**
 * registerError
 * @param {string} text - text sent from event emitter
 * @desc Console logs the text
 */
let registerError = (data) => {
  console.error(data.message);
};

/**
 * registerSave
 * @param {string} text - text sent from event emitter
 * @desc Console logs the text
 */
let registerSave = (data) => {
  console.log(data.message);
};

events.on('registerSave', registerSave);
events.on('registerError', registerError);
