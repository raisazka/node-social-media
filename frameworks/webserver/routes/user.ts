import express from "express"
import UserController from "../../../controllers/userController"
import authMiddleware from "../middlewares/authMiddleware"

export default (router: express.Router, controller: UserController) => {
    router.route("/update").post(authMiddleware, controller.updateProfile)
    return router
}
