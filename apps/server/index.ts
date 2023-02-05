import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressWs from 'express-ws'
import createWsRouter from './ws'
import db from './db'
import cors from 'cors'

const router = express.Router()

async function start() {
  /**
   * Create a new express app
   */
  const { app, getWss } = expressWs(express())

  app.use(cors({
    origin: true,
    credentials: true
  }));

  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(createWsRouter(router, getWss()))

  /**
   * '/' route will respond with "Hello World"
   */
  app.get('/', (_req, res) => {
    res.send('Hello World!')
  })

  /**
   * @example: user sends POST request for all messages with email
   */
  app.post('/messages', async (req, res) => {
    /**
     * 1) get email from the request body
     */
    const email = req.body.email

    /**
     * 2) use the email to get the entire user object
     *    hint: use autocomplete to figure out what you can do
     */
    const user = await db.user.findFirst({ 
      where: { 
        email: email
      } 
    })

    /**
     * 3) get the user ID from the user object
     */
    const userID = user.id

    /**
     * 3) use the userID to find all messages associated with the user
     */
    const messages = await db.message.findMany({
      where: {
        userid: userID
      }
    })

    /**
     * 4) set a cookie with the number of messages the user has
     */
    res.cookie('messageCount', messages.length)

    /**
     * 5) respond to the request the messages
     */
    res.json(messages)
  })

  /**
   * TODO Jasmin: given a POST request to login, write the user's email to a cookie
   */
  app.post('/login', async (req, res) => {
    console.log(req.body.email)

    /**
     * 1) get the user's email from the request body
     */
    const email = req.body.email

    /**
     * 2) find the user in the database
     */
      const user = await db.user.findFirst({
        where: {
          email: email
        }
      })
    /**
     * 3) set the "user" cookie with the value of the user
     */
      res.cookie('user', user, {
        path: '/'
      })

    /**
     * 4) send a response confirming their login, e.g. "Logged in as <user.email>"
     */
    res.json(user)
  })

  app.post('/register', async (req, res) => {
    console.log(req.body.email)

    /**
     * 1) get the user's email from the request body
     */
    const email = req.body.email

    /**
     * 2) find the user in the database
     */
      const user = await db.user.create({
        data: {
          role: 'user',
          sessionid: 123,
          name: email,
          email
        }
      })

    /**
     * 3) set the "user" cookie with the value of the user
     */
      res.cookie('user', user, {
        path: '/'
      })

    /**
     * 4) send a response confirming their login, e.g. "Logged in as <user.email>"
     */
    res.json(user)
  })



  /**
   * TODO Thang: given a POST request to join a session, return the session data
   */
  app.post('/session', async (req, res) => {
    /**
     * 1) get the session ID from the request body
     */
    const session_ID = req.body.session_ID

    /**
     * 2) lookup the session in the database
     */
    const sessions = await db.session.findFirst({
      where: {
        id: session_ID 
      }
    })

    /**
     * 3) return the session data
     */
    res.json(sessions)
  })

  /**
   * start the server on port 3000
   */
  app.listen(3000, () => {
    console.log(`🚀 Server ready at http://localhost:3000`)
  })
}

start()
