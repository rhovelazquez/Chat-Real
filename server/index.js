import express from 'express';
import http from 'http'
import {Server as SocketServer} from "socket.io"
 
const app = express();
const port = 3000

const server = http.createServer(app);
const io= new SocketServer(server)
io.on('connection',socket =>{
    console.log('Client connected')

    socket.on('mensaje',(data)=>{ //backend escucha
        console.log(data);
        socket.broadcast.emit('mensaje',{
            data,
            from:socket.id.slice(6)
        })//backend envia
    })
})

server.listen(port);
console.log("server listening on port"+port);