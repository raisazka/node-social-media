import { Request } from "express"
import User from "../../src/entity/user"

export const getUserFromHeader = (req: Request): User => {
    const userJSON = req.header("user")
    return JSON.parse(userJSON) as User
}
