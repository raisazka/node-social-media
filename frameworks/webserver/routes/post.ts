import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import PostController from "../../../controllers/postController"

export default (router: express.Router, controller: PostController) => {
    router.route("/").post(authMiddleware, controller.createPost)
    router.route("/:postId").patch(authMiddleware, controller.updatePost)
    router.route("/like/:postId").patch(authMiddleware, controller.likePost)
    return router
}
