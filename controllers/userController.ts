import { Inject, Service } from "typedi"
import { Request, Response, NextFunction } from "express"
import "reflect-metadata"
import UserUseCase from "../app/usecases/userUsecase"
import User from "../src/entity/user"
import { getUserFromHeader } from "../utils/reqHeader/reqHeader"

@Service()
class UserController {
    @Inject()
    userUseCase: UserUseCase

    updateProfile = (
        req: Request<{}, {}, User>,
        res: Response,
        next: NextFunction
    ) => {
        this.userUseCase
            .updateProfile(req.body)
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    follow = (
        req: Request<{ followeeId: string }, {}, User>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.userUseCase.
            follow(user, req.params.followeeId).
            then(() => {
                res.json({
                    message: "success"
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

export default UserController
