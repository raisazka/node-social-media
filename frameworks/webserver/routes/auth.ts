import express from "express"
import AuthController from "../../../adapters/auth"

export default (router: express.Router, controller: AuthController) => {
    router.route("/register").post(controller.register)
    return router
}
