import express from "express"
import authRouter from "./auth"
import userRouter from "./user"
import postRouter from "./post"
import AuthController from "../../../controllers/authController"
import UserController from "../../../controllers/userController"
import PostController from "../../../controllers/postController"

export default function routes(
    app: express.Application,
    router: express.Router,
    authController: AuthController,
    userController: UserController,
    postController: PostController
) {
    app.use("/api/v1/auth", authRouter(router, authController))
    app.use("/api/v1/user", userRouter(router, userController))
    app.use("/api/v1/post", postRouter(router, postController))
}
