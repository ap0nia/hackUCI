import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { WebSocket, WebSocketServer } from 'ws';
import { parse } from 'url'
import db from './db'

interface SessionWs extends WebSocket {
    user: any
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

    })

    app.get('/api/info', async (req, res) => {
        const [messages, sessions, users ] = await db.$transaction([
            db.message.findMany(),
            db.session.findMany(),
            db.user.findMany(),
        ])
        res.json({ messages, sessions, users })
    })

    app.get('/api/reset', async (req, res) => {
        const [messages, sessions, users ] = await db.$transaction([
            db.message.deleteMany(),
            db.session.deleteMany(),
            db.user.deleteMany(),
        ])
        res.json({ messages, sessions, users })
    })

    app.post('/api/login', async (req, res) => {
        if (!req.body.email) {
            return res.json({})
        }
        const user = await db.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 7 })
        res.json({ user })
    })

    app.post('/api/register', async (req, res) => {
        if (!req.body.email) {
            return res.json({})
        }
        const user = await db.user.create({
            data: {
                email: req.body.email
            }
        })
        res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 7 })
        res.json({ user })
    })

    app.post('/api/logout', async (req, res) => {
        try {
            const user = await db.user.update({
                where: {
                    email: req.body.email
                },
                data: {
                    session_id: null,
                }
            })
            res.cookie('user', '', { maxAge: 0 })
            res.json({ user })
        }
        catch {
            res.json({})
        }
    })

    app.post('/api/join', async (req, res) => {
        try {
            const user = await db.user.update({
                where: {
                    email: req.cookies?.user?.email
                },
                data: {
                    session_id: req.body.session
                }
            })
            res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 7 })
            res.json({ user })
        }
        catch {
            res.json({})
        }
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
        cookieParser()(req as any, {} as any, () => {})
        ws.user = (req as any).cookies.user || {}
        console.log('session', ws.user)

        ws.on('message', async (msg: string) => {
            const msgString = msg.toString()

            // it's a message
            // if (msgString.startsWith('MESSAGE:')) {
            //     console.log(msgString.replace('MESSAGE: ', ''))
            // }
            // else {
            //     console.log('normal', msgString)
            // }
            // const message = await db.message.create({
            //   data: {
            //       userid: user_id,
            //       sessionid: session_id,
            //       content: msg.toString(),
            //   },
            //});

            wss.clients.forEach((client) => {
                const s = JSON.stringify({
                    id: (ws as SessionWs).user?.id,
                    message: {
                        content: msgString,
                    },
                    user: {
                        name: (ws as SessionWs).user?.email || '',
                        id: (ws as SessionWs).user?.id
                    }
                })
                console.log(s)
                client.send(s)
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
