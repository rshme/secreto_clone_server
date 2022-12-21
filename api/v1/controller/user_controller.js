import UserService from '../service/user_service.js'
import jwt from "jsonwebtoken";
import ChatService from "../service/chat_service.js";

export default class UserController {
    static async Fetch(req, res) {
        const users = await UserService.FetchUsers()

        res.status(200).json({
            "code_status": 200,
            "msg_status": "Users has been loaded",
            "data": users
        })
    }

    static async Store(req, res) {
        try {
            const user = await UserService.StoreUser(req.body)

            const token = jwt.sign({
                username: user.username,
            }, 'secret', { expiresIn: '1h' });

            res.status(200).json({
                "code_status": 200,
                "msg_status": "New User has been stored",
                "data": {
                    "userData": user,
                    "token": token
                }
            })

        } catch(error) {
            console.error(error)

            res.status(500).json({
                "code_status": 500,
                "msg_status": "Something went wrong",
            })
        }
    }

    static async Show(req, res) {
        let isOwner = false

        if (req.headers.authorization?.split(" ")[1] !== "undefined") {
            console.log('Authorization is : ', req.headers.authorization)

            const token = req.headers.authorization.split(' ')[1]

            const decodedToken = jwt.decode(token, {complete: true})

            if (decodedToken.payload.username === req.params.username)
                isOwner = true
        }

        try {
            const user = await UserService.GetUser(req.params.username)

            req.socketIO.on("connection", (io) => {
                io.on('room', (roomName) => {
                    io.join(`room-${roomName}`)
                });
            });

            res.status(200).json({
                "code_status": 200,
                "msg_status": "User has been loaded",
                "data": {
                    user,
                    is_owner: isOwner
                }
            })
        } catch(error) {
            console.error(error)

            res.status(500).json({
                "code_status": 500,
                "msg_status": "Something went wrong"
            })
        }
    }

    static Update(req, res) {

    }

    static Destroy(req, res) {

    }
}
