import io from "../server";
import {addMessage , getAllChatHistory} from './chatlogsController'
import {removeSessionByUserName} from './gamesessionController'

io.on("connection", (socket) => {
  socket.join('game session room null');
  
  socket.on("join game session", (sessionId) => {
    socket.join(`game session room ${sessionId}`);
  });

  socket.on("leave game session", (sessionId) => {
    socket.leave(`game session room ${sessionId}`);
  });

  socket.on("playerMove", (data) => {
    socket.broadcast.emit("playerMoved", data);
  });
  
  socket.on("new message chat", async (msg, sessionId) => {
    await addMessage(msg);
    io.to(`game session room ${sessionId}`).emit("add message", msg);
  });

  socket.on('chat history', async (sessionId) => {
    const chatHistory = await getAllChatHistory(sessionId);
    socket.emit('emit chat history', chatHistory);
  });

  socket.on('disconnect' , () => {
    // removeSessionByUserName()
  })
});