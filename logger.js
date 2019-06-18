'use strict';

const net = require('net');
const events = require('./events.js');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in app.js created!'));

client.on('data', (buffer) => {
  let text = buffer.toString().trim();

  if (text.slice(0, 4) === 'SAVE') {
    events.emit('registerError', text);
  } else if (text.slice(0, 5) === 'ERROR') {
    events.emit('registerSave', text);
  }
});

/**
 * registerError
 * @param {string} text - text sent from event emitter
 * @desc Console logs the text
 */
let registerError = (text) => {
  console.error(text);
};

/**
 * registerSave
 * @param {string} text - text sent from event emitter
 * @desc Console logs the text
 */
let registerSave = (text) => {
  console.log(text);
};

events.on('registerSave', registerSave);
events.on('registerError', registerError);
