import { Inject, Service } from "typedi"
import { Request, Response, NextFunction } from "express"
import "reflect-metadata"
import UserUseCase from "../app/usecases/userUsecase"
import User from "../src/entity/user"

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
}

export default UserController
