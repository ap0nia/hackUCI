import expressWs from 'express-ws';
import { Server, WebSocket } from 'ws'
import db from './db'

function createWsRouter(router: expressWs.Router, wss: Server<WebSocket>) {
    router.ws('/api/chat', async function(ws, req) {
        const query = req.query.cookie as string
        console.log({query})
        const cookieUser = JSON.parse(query || '{}')
        const user_id = cookieUser.id || 1
        const session_id = 1

        console.log('cookie', cookieUser)

        const user = await db.user.findFirst({
            where: {
                id: user_id,
            }
        })


        wss.on('connection', function connection(_ws, _req) {
            console.log('user connected')
        });


        /**
         * 1) get the userID and sessionID from cookies
         */

        /**
         * on every message sent...
         */
        ws.on('message', async function(msg) {
            /**
             * check the userID and sessionID and save the message to the database
             */
            const message = await db.message.create({
                data: {
                    userid: user_id,
                    sessionid: session_id,
                    content: msg.toString(),
                },
            });

            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({ message, user }))
                }
            });
        });
    });
    return router
}

export default createWsRouter
