import { Inject, Service } from "typedi"
import { Request, Response, NextFunction } from "express"
import PostUseCase, { CreatePostRequest } from "../app/usecases/postUsecase"
import "reflect-metadata"
import { getUserFromHeader } from "../utils/reqHeader/reqHeader"

@Service()
class PostController {
    @Inject()
    postUseCase: PostUseCase

    createPost = (
        req: Request<{}, {}, CreatePostRequest>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.postUseCase
            .createPost(user, req.body)
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    updatePost = (
        req: Request<{ postId: string }, {}, CreatePostRequest>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.postUseCase
            .updatePost(user, req.params.postId, req.body.content)
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    likePost = (
        req: Request<{ postId: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.postUseCase
            .likePost(user, req.params.postId)
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

export default PostController
