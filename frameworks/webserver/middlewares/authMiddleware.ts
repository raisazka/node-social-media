import { Request, Response, NextFunction } from "express"
import { verify } from "../../service/auth"
import BaseError from "../../../utils/err/baseError"
import User from "../../../src/entity/user"

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")
    if (!token) {
        throw new BaseError(401, "No access token found")
    }
    if (token.split(" ")[0] !== "Bearer") {
        throw new BaseError(401, "Invalid access token format")
    }
    try {
        const decoded = verify(token.split(" ")[1])
        const user = decoded as User
        res.header("user", JSON.stringify(user))
        next()
    } catch (err) {
        throw new BaseError(401, "Token is not valid")
    }
}
