import ChatRepository from "../repository/chat_repository.js";
import UserService from "./user_service.js";

export default class ChatService {
    static async StoreChat(username, chatRequest) {
        try {
            const user = await UserService.GetUser(username)
            chatRequest.user = user._id

            const chat = await ChatRepository.StoreChat(chatRequest)

            return {
                _id: chat._id,
                chat: chat.chat,
                created_at: chat.created_at
            }
        } catch (error) {
            console.error(error)

            return false
        }
    }

    static async GetChatById(chatID) {
        try {
            return await ChatRepository.GetChatById(chatID)
        } catch (error) {
            console.error(error)

            return {}
        }
    }

    static async GetChatByUsername(username) {
        try {
            return await ChatRepository.GetChatsByUsername(username)
        } catch (error) {
            console.error(error)

            return {}
        }
    }

    static async DeleteChat(chatID) {
        return await ChatRepository.DeleteChat(chatID)
    }
}