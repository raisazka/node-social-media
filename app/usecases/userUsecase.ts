import { Inject, Service } from "typedi"
import "reflect-metadata"
import UserRepository from "../../frameworks/database/mongodb/repository/user/userRepo"
import User from "../../src/entity/user"

@Service()
class UserUseCase {
    @Inject()
    userRepo: UserRepository

    updateProfile = async (user: User): Promise<void> => {
        await this.userRepo.update(user)
    }
}

export default UserUseCase
