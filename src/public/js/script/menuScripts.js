import socket from "../../utils/socket.js";
import { create, clear } from "./menuCreateItems/createBubble.js";

socket.on("add message", (msg) => {
  create(msg);
});

socket.on("emit chat history", arrMsg => {
  clear();
  arrMsg.forEach(e => {
    create(e)
  })
});

playButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  settingMenu.style.display = "none";
  gameMenu.style.display = "flex";
});

settingsButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  gameMenu.style.display = "none";
  settingMenu.style.display = "flex";
});

playBackButton.addEventListener("click", function () {
  gameMenu.style.display = "none";
  mainMenu.style.display = "flex";
});

settingsBackButton.addEventListener("click", function () {
  settingMenu.style.display = "none";
  mainMenu.style.display = "flex";
});

document.addEventListener("DOMContentLoaded", () => {
  chatIcon.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "block" ? "none" : "block";
  });
  const checkBox = document.getElementById("full-chat-history");
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      socket.emit('chat history' , null)
    }
  });
});

const postForm = (e) => {
  e.preventDefault();
  socket.emit("new message chat", chatForm.chatInput.value , null);
//   create(chatForm.chatInput.value);
};

chatForm.addEventListener("submit", postForm);
