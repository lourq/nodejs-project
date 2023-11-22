import '/socket.io/socket.io.js'

const socket = io();

socket.io.on('reconnect_failed' , error => {
    window.location.href = '/menu'
})

export default socket;