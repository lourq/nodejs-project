import '/socket.io/socket.io.js'

const socket = io();

socket.on('new message' , (msg) => {
    console.log(msg)
})

export default socket;