import express from 'express';
import http from 'http'
import {Server as SocketServer} from "socket.io"
 
const app = express();
const port = 3000

const server = http.createServer(app);
const io= new SocketServer(server)

server.listen(port);
console.log("server listening on port"+port);