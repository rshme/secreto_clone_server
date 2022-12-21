import ChatService from "../service/chat_service.js";

export default class ChatController {
    static async Store(req, res) {
        try {
            const chat = await ChatService.StoreChat(req.params.username, req.body)

            req.socketIO.to(`room-${req.params.username}`).emit('new-msg', chat)

            res.status(200).json({
                "code_status": 200,
                "msg_status": "New Chat has been added"
            })
        } catch(error) {
            console.error(error)

            res.status(500).json({
                "code_status": 500,
                "msg_status": "Something went wrong"
            })
        }
    }

    static async GetChat(req, res) {
        try {
            const chat = await ChatService.GetChatById(req.params.chatID)

            res.status(200).json({
                "code_status": 200,
                "msg_status": "Chat has been loaded",
                "data": chat
            })
        } catch(error) {
            console.error(error)

            res.status(500).json({
                "code_status": 500,
                "msg_status": "Something went wrong"
            })
        }
    }

    static async Destroy(req, res) {
        try {
            await ChatService.DeleteChat(req.params.chatID)

            res.status(200).json({
                "code_status": 200,
                "msg_status": "Chat has been deleted"
            })
        } catch(error) {
            console.error(error)

            res.status(500).json({
                "code_status": 500,
                "msg_status": "Something went wrong"
            })
        }
    }
}