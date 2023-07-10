import express from "express"
import authRouter from "./auth"
import userRouter from "./user"
import AuthController from "../../../controllers/authController"
import UserController from "../../../controllers/userController"

export default function routes(
    app: express.Application,
    router: express.Router,
    authController: AuthController,
    userController: UserController
) {
    app.use("/api/v1/auth", authRouter(router, authController))
    app.use("/api/v1/user", userRouter(router, userController))
}
