import UserModel from "../models/user"
import { Service } from "typedi"
import Pagination from "../../../../utils/pagination/pagination"
import User from "../../../../src/entity/user"
import "reflect-metadata"

interface FindUserByPropsRequest {
    id?: string
    email?: string
    name?: string
}

@Service()
class UserRepository {
    add = async (name: string, email: string, password: string) => {
        const user = await UserModel.create({
            name,
            password,
            email,
        })

        return user
    }
    getUserById = async (id: string): Promise<User> => {
        return await UserModel.findOne<User>({ id: id })
    }
    findUserByProperty = async (
        params: FindUserByPropsRequest,
        pagination: Pagination
    ): Promise<User[]> => {
        return await UserModel.find<User>({ ...params })
            .skip(pagination.size * pagination.page - pagination.size)
            .limit(pagination.size)
    }
    findUsersByIds = async (userIds: string[]): Promise<User[]> => {
        return await UserModel.find<User>({
            id: {
                $in: userIds,
            },
        })
    }
    update = async (user: User) => {
        await UserModel.findOneAndUpdate({ id: user.id }, user)
    }
    removeFollowing = async (userId: string, targetUserId: string) => {
        await UserModel.updateOne(
            {
                id: userId,
            },
            {
                $pull: {
                    followings: targetUserId,
                },
            }
        )

        await UserModel.updateOne(
            {
                id: targetUserId,
            },
            {
                $pull: {
                    followers: userId,
                },
            }
        )
    }
    addFollowing = async (userId: string, targetUserId: string) => {
        await UserModel.updateOne(
            {
                id: userId,
            },
            {
                $push: {
                    followings: targetUserId,
                },
            }
        )

        await UserModel.updateOne(
            {
                id: targetUserId,
            },
            {
                $push: {
                    followers: userId,
                },
            }
        )
    }
}

export default UserRepository
