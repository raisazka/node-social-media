import { Request } from "express"
import User from "../../src/entity/user"

export const getUserFromHeader = (req: Request): User => {
    console.log(req.user, "JSON USER")
    return JSON.parse(req.user)
}
