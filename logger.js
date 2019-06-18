'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in app.js created!'));

client.on('data', (buffer) => registerData(buffer));

let registerData = (buffer) => {
  let text = buffer.toString().trim();

  if (text.slice(0, 4) === 'SAVE') {
    console.log(text);
  } else if (text.slice(0, 5) === 'ERROR') {
    console.error(text);
  }
};
