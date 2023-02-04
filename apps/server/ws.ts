import expressWs from 'express-ws';

function createWsRouter(router: expressWs.Router) {
    router.ws('/chat', function(ws, _req) {
        ws.on('message', function(msg) {
            ws.send(msg)
        });
    });
    return router
}

export default createWsRouter
