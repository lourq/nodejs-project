document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('settingMenu').style.display = 'none';
    document.getElementById('gameMenu').style.display = 'flex';
});

document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('settingMenu').style.display = 'flex';
});

document.getElementById('playBackButton').addEventListener('click', function() {
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
});

document.getElementById('settingsBackButton').addEventListener('click', function() {
    document.getElementById('settingMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
});


document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chatIcon");
  const chatWindow = document.getElementById("chatWindow");

  chatIcon.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "block" ? "none" : "block";
  });
});
