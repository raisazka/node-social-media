import {
    compare,
    encryptPassword,
    generateToken,
} from "../../frameworks/service/auth"
import { Service, Inject } from "typedi"
import "reflect-metadata"
import UserRepository from "../../frameworks/database/mongodb/repository/user/userRepo"

@Service()
class AuthUseCase {
    @Inject()
    userRepo: UserRepository

    register = async (
        name: string,
        email: string,
        password: string
    ): Promise<string> => {
        await this.userRepo.add(name, email, encryptPassword(password))
        return generateToken(email, password)
    }

    login = async (email: string, password: string): Promise<string> => {
        if (!email || !password) {
            throw new BaseError(401, "email and password is not valid")
        }

        return this.userRepo
            .findUserByProperty({ email }, { page: 0, size: 1 })
            .then((users) => {
                if (users.length === 0) {
                    throw new BaseError(500, "user not found")
                }

                if (!compare(password, users[0].password)) {
                    throw new BaseError(500, "password doesn't match")
                }

                return generateToken(email, password)
            })
    }
}

export default AuthUseCase
