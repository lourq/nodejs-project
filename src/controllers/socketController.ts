import io from "../server";

io.on("connection", (socket) => {
  socket.on("playerMove", (data) => {
    socket.broadcast.emit("playerMoved", data);
  });
  socket.on("new message", (msg) => {
    socket.broadcast.emit("add message", msg);
  });
});
