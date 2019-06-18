'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

const EventEmitter = require('events');

const events = new EventEmitter();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => events.emit('dispatchEvent', buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();

  if (text.slice(0, 4) === 'SAVE') {
    console.log(text);
  } else if (text.slice(0, 5) === 'ERROR') {
    console.error(text);
  }
  
  // for (let socket in socketPool) {
  //   socketPool[socket].write(`${event} ${text}`);
  // }
};

events.on('dispatchEvent', dispatchEvent);
