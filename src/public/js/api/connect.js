import socket from '../../utils/socket.js'

const redirect = async(e) => {
    e.preventDefault();

    await fetch('/api/join')

    window.location.href = '/game'

    socket.emit('join game session',1)
} 

document.getElementById('createGameButton').addEventListener('click' , redirect)
