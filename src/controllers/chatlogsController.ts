import ChatLogs from "../models/ChatLogs";

export const addMessage = async (msg) => {
  try {
    return await ChatLogs.build({
      Message: msg,
      TimeStamp: formatTime(new Date()),
    }).save();
  } catch (err) {
    throw err;
  }
};

export const getAllChatHistory = async (sessionId) => {
  try {
    const chatHistory = await ChatLogs.findAll({
      where: {
        SessionID: sessionId,
      },
    });
    return chatHistory.map(e => e.Message);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const formatTime = (date) => {
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
