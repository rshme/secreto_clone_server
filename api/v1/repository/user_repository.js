import User from '../../../domain/User.js'

export default class UserRepository {
    static async FetchUsers() {
        try {
            return await User.find()
        } catch (error) {
            console.error(error)
        }
    }

    static async StoreUser(userRequest) {
        try {
            return await User.create(userRequest)
        } catch(error) {
            console.error(error)
            return false
        }
    }

    static async GetUserByUsername(username) {
        return await User.findOne({ username })
                         .select('-__v -updated_at')
                         .populate({ path: 'chats', select: ['_id', 'chat', 'created_at']})
                         .exec()
    }

    static async UpdateUser(userID, userRequest) {
        try {
            await User.findByIdAndUpdate(userID, userRequest)

            return true
        } catch(error ) {
            console.error(error)
            return false
        }
    }

    static async DeleteUser(userID) {
        try {
            await User.findByIdAndDelete(userID)
            return true
        } catch(error) {
            console.error(error)
            return false
        }
    }
}