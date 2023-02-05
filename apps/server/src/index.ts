import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { WebSocket, WebSocketServer } from 'ws';
import { parse } from 'url'
import db from './db'

interface SessionWs extends WebSocket {
    session_id: string
}

async function start() {
    const app = express();

    app.use(cors({ credentials: true, origin: true }))
    app.use(cookieParser())
    app.use(bodyParser.json())

    //initialize a simple http server
    const server = http.createServer(app);

    //initialize the WebSocket server instance
    const wss = new WebSocketServer({ noServer: true });

    app.get('/', async (req, res) => {
        const users = await db.user.findMany()
        const messages = await db.message.findMany()
        const sessions = await db.session.findMany()

        res.json({ users, messages, sessions })

        // db.$transaction([
        //     db.message.deleteMany(),
        //     db.session.deleteMany(),
        //     db.user.deleteMany(),
        // ])
    })

    app.post('/api/login', async (req, res) => {
        const defaultUser = {
            id: 123,
            email: 'asdf',
        }

        const user = await db.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        res.cookie('user', user)
        res.json({ user })
    })

    server.on('upgrade', (request, socket, head) => {
        const pathname = parse(request?.url || '').pathname;
        if (pathname === '/api/chat') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    wss.on('connection', (ws: SessionWs, req) => {
        let cookies: any = {}
        cookieParser()(req as any, cookies as any, () => {})
        ws.session_id = cookies.session_id || 'global'

        ws.on('message', (message: string) => {
            wss.clients.forEach((client) => {
                client.send(`Session: ${ws.session_id}, new message: ${message}`);
            })
        });

        ws.on('close', () => {
            console.log('disconnected')
        })
    });

    //start our server
    server.listen(3000, () => {
        console.log(`🚀 Server ready at http://localhost:3000`)
    });
}

start()
