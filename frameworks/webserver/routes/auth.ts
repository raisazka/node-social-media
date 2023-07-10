import express from "express"
import AuthController from "../../../controllers/authController"

export default (router: express.Router, controller: AuthController) => {
    router.route("/register").post(controller.register)
    router.route("/login").post(controller.login)
    return router
}
