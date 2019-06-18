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
  for (let socket in socketPool) {
    socketPool[socket].write(buffer);
  }
};

events.on('dispatchEvent', dispatchEvent);
