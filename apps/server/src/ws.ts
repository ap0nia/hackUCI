import expressWs from 'express-ws';
import express from 'express';
import type { Server, WebSocket } from 'ws'

const router = express.Router()

router.ws('/api/chat', async function(ws, req) {
  console.log('hi')
})
