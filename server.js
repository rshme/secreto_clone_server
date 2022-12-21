import dotenv from 'dotenv'
dotenv.config();

// Setup Express
import express from 'express'
const app = express()

// Setup Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Setup CORS
import cors from 'cors'
app.use(cors())

// Setup Mongoose
import db from './config/db.js'
db().catch(err => console.error(err))

// Socket IO Configuration
import { Server } from 'socket.io'
import { createServer } from 'http'
const httpServer = createServer(app)
const socketIO = new Server(httpServer, {
    cors: {
        origin: `${process.env.APP_CLIENT_HOST}`,
        methods: ["GET", "POST"]
    }
})
app.use((req, res, next) => {
    req.socketIO = socketIO
    next()
})

import router from './routes/api.js'
app.use('/api/v1', router)

httpServer.listen(process.env.APP_PORT || 8000)