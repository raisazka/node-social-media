import { Inject, Service } from "typedi"
import AuthUseCase from "../app/usecases/auth"
import { Request, Response, NextFunction } from "express"
import "reflect-metadata"

interface AuthRequest {
    name?: string
    email: string
    password: string
}

@Service()
class AuthController {
    @Inject()
    authUseCase: AuthUseCase

    register = (
        req: Request<{}, {}, AuthRequest>,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password, name } = req.body
        this.authUseCase
            .register(name, email, password)
            .then((token) => {
                res.json({
                    token,
                })
            })
            .catch((err) => {
                console.error(err)
                next(err)
            })
    }

    login = (
        req: Request<{}, {}, AuthRequest>,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password } = req.body
        this.authUseCase
            .login(email, password)
            .then((token) => {
                res.json({ token })
            })
            .catch((err) => {
                next(err)
            })
    }
}

export default AuthController
