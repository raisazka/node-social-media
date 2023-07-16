import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import PostController from "../../../controllers/postController"

export default (router: express.Router, controller: PostController) => {
    router.route("/").post(authMiddleware, controller.createPost)
    router.route("/:postId").patch(authMiddleware, controller.updatePost)
    router.route("/like/:postId").patch(authMiddleware, controller.likePost)
    router.route("/").get(authMiddleware, controller.listPost)
    router
        .route("/:postId/comment")
        .post(authMiddleware, controller.commentPost)
    router
        .route("/:postId/comment/:commentId")
        .delete(authMiddleware, controller.deleteComment)
    router.route("/:postId/comment").get(authMiddleware, controller.listComment)
    router
        .route("/:postId/comment/:commentId")
        .patch(authMiddleware, controller.updateComment)
    return router
}
