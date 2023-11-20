playButton.onclick = () => {
    window.location.href = 'gameMenu'
}
settingsButton.onclick = () => {
    window.location.href = 'settings'
}
document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
  
    chatIcon.addEventListener('click', () => {
      chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
    });
  });