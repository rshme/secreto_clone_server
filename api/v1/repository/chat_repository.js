import Chat from '../../../domain/Chat.js'
import User from "../../../domain/User.js";

export default class ChatRepository {
    static async StoreChat(chatRequest) {
        try {
            const chat = await Chat.create(chatRequest)
            await User.findByIdAndUpdate(
                chat.user._id,
                {
                    $push: {
                        chats: chat._id
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )

            return chat
        } catch(error) {
            console.error(error)
            return false
        }
    }

    static async GetChatById(chatID) {
        return await Chat.findById(chatID).populate('user').exec()
    }

    static async GetChatsByUsername(username) {
        const user = await User.findOne({ username }).exec()
        return await Chat.find().where('user').equals(user._id).exec()
    }

    static async DeleteChat(chatID) {

    }
}