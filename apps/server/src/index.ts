import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { parse } from 'url'

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });

app.get('/', (req, res) => {
    res.send('Hello World!');
})

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = parse(request?.url || '').pathname;
    if (pathname === '/ws') {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(3000, () => {
    console.log(`🚀 Server ready at http://localhost:3000`)
});
