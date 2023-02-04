import { PrismaClient } from '@prisma/client';
import expressWs from 'express-ws';
import { Server, WebSocket } from 'ws'
import db from './db'
//import cookieParser from 'cookie-parser'

function createWsRouter(router: expressWs.Router, wss: Server<WebSocket>) {
    router.ws('/chat', function(ws, req) {
        wss.on('connection', function connection(ws) {
        });
        /**
         * 1) get the userID and sessionID from cookies
         */
        /**
         * on every message sent...
         */
        ws.on('message', async function(msg) {
            const user_id = req.cookies.userID || 1
            const session_id = req.cookies.session_ID || 43
            /**
             * check the userID and sessionID and save the message to the database
             */
            const newMessage = await db.message.create({
                data: {
                    userid: user_id,
                    sessionid: session_id,
                    content: msg.toString(),
                },
            });

            console.log(newMessage)

            wss.clients.forEach((client, b, c) => {
                if (client != ws && client.readyState == WebSocket.OPEN) {
                    client.send(msg)
                }
            });
        });
    });
    return router
}

export default createWsRouter
