import { encryptPassword } from "../../../../service/auth"
import UserModel from "../../models/user"

class AuthRepository {
    register = async (req: RegisterRequest) => {
        await UserModel.create({
            name: req.name,
            password: encryptPassword(req.password),
            email: req.email,
        })
    }

    login = async () => {
        console.log("login")
    }
}

export default AuthRepository
