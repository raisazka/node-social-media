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

    findUserByProperty = async (
        params: FindUserByPropsRequest,
        pagination: Pagination
    ): Promise<User[]> => {
        const users = await UserModel.find<User>({ ...params })
            .skip(pagination.size * pagination.page - pagination.size)
            .limit(pagination.size)

        return users
    }

    update = async (user: User) => {
        await UserModel.findOneAndUpdate({ id: user.id }, user)
    }
}

export default UserRepository
