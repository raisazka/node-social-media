import { Inject, Service } from "typedi"
import "reflect-metadata"
import UserRepository from "../../frameworks/database/mongodb/repository/userRepo"
import User from "../../src/entity/user"

@Service()
class UserUseCase {
    @Inject()
    userRepo: UserRepository

    updateProfile = async (user: User): Promise<void> => {
        await this.userRepo.update(user)
    }

    follow = async (user: User, followingUserId: string): Promise<void> => {
        const usr = await this.userRepo.getUserById(user.id)
        const following = usr.followings.filter((id) => {
            return id === user.id
        })
        // unfollow if user currently following
        if (following.length > 0) {
            return await this.userRepo.removeFollowing(user.id, followingUserId)
        }

        return await this.userRepo.addFollowing(user.id, followingUserId)
    }
}

export default UserUseCase
