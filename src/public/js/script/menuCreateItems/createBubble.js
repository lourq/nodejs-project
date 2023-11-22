export const create = msg => {
    const newMessage = document.createElement('div');
    newMessage.textContent = msg;
    messageDisplay.appendChild(newMessage);

    messageDisplay.scrollTop = messageDisplay.scrollHeight;
}

export const clear = () => {
    messageDisplay.innerHTML = '';
}