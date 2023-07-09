import express from "express"
import authRouter from "./auth"
import AuthController from "../../../adapters/auth"

export default function routes(
    app: express.Application,
    router: express.Router,
    authController: AuthController
) {
    app.use("/api/v1/auth", authRouter(router, authController))
}
