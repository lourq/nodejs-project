import ChatLogs from "../models/ChatLogs";

export const addMessage = async (sessionID , playerID ,msg) => {
  try {
    return await ChatLogs.build({
      SessionID: sessionID,
      PlayerID: playerID,
      Message : msg,
      TimeStamp : formatTime(new Date()) 
    }).save();
  } catch (err) {
    throw err;
  }
};

const formatTime = date => {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
}