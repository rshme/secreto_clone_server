import express from 'express'
const router = express.Router()

// User Routes
import UserController from '../api/v1/controller/user_controller.js'
router.get('/user', UserController.Fetch)
router.post('/user', UserController.Store)
router.get('/user/:username', UserController.Show)
router.put('/user/:userID', UserController.Update)
router.delete('/user/:userID', UserController.Destroy)

// User Routes
import ChatController from '../api/v1/controller/chat_controller.js'
router.post('/chat/:username', ChatController.Store)
router.get('/chat/:chatID', ChatController.GetChat)
router.delete('/chat/:chatID', ChatController.Destroy)

export default router