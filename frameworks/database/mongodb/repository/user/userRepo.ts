import UserModel from "../../models/user"
import { Service } from "typedi"
import "reflect-metadata"
import User from "../../../../../src/entity/user"

interface FindUserByPropsRequest {
    id?: string
    email?: string
    name?: string
}

@Service()
class UserRepository {
    add = async (name: string, email: string, password: string) => {
        await UserModel.create({
            name,
            password,
            email,
        })
    }

    findUserByProperty = async (
        params: FindUserByPropsRequest,
        pagination: Pagination
    ): Promise<User[]> => {
        const users = await UserModel.find<User>({ params })
            .skip(pagination.size * pagination.page - pagination.size)
            .limit(pagination.size)

        return users
    }
}

export default UserRepository
