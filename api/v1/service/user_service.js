import UserRepository from "../repository/user_repository.js";
import randomize from "../../../helpers/randomize.js";
import moment from "moment";
import logger from "../../../config/logger.js";

export default class UserService {
    static FetchUsers() {
        return UserRepository.FetchUsers()
    }

    static async StoreUser(userRequest) {
        userRequest.username = randomize(5)
        userRequest.expired_at = moment().add(1, 'hours').format()

        try {
            const {name, username, created_at, expired_at} = await UserRepository.StoreUser(userRequest)
            return {name, username, created_at, expired_at}
        }
         catch(error) {
            console.error(error)

            return false
        }
    }

    static async GetUser(username) {
        const user = await UserRepository.GetUserByUsername(username)

        if (!user) {
            logger.info('user is not found in database')
            throw new Error("user isn't found")
        }

        return user
    }

    static UpdateUser(userID, userRequest) {
        return UserRepository.UpdateUser(userID, userRequest)
    }

    static DeleteUser(userID) {
        return UserRepository.DeleteUser(userID)
    }
}
