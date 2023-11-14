import '/socket.io/socket.io.js'

const socket = io();

io.on('connection', (socket) => {
    socket.on('send message', (roomId, message) => {
      socket.to(roomId).emit('new message', message);
    });
});
  