import express from 'express'

const router = express.Router()

router.ws('/kebin', function(ws, req) {
    ws.on('message', function(msg) {
        ws.send(msg)
    });
});

export default router