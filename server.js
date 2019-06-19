'use strict';

const net = require('net');
const events = require('./events.js');

const port = process.env.PORT || 3001;
const server = net.createServer();

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

/**
 * dispatchEvent
 * @param {string} buffer - buffer from server.on('connection)
 * @desc handles writing the buffer to all connected sockets
 */
let dispatchEvent = (buffer) => {
  for (let socket in socketPool) {
    socketPool[socket].write(buffer);
  }
};

events.on('dispatchEvent', dispatchEvent);
