import { Inject, Service } from "typedi"
import { Request, Response, NextFunction } from "express"
import PostUseCase, { CreatePostRequest } from "../app/usecases/postUsecase"
import "reflect-metadata"
import { getUserFromHeader } from "../utils/reqHeader/reqHeader"
import BaseError from "../utils/err/baseError"
import PostCommentUseCase from "../app/usecases/postCommentUseCase"

@Service()
class PostController {
    @Inject()
    postUseCase: PostUseCase
    @Inject()
    commentUseCase: PostCommentUseCase

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

    deletePost = (
        req: Request<{ postId: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {}

    listPost = (
        req: Request<{}, {}, {}, { page: string; size: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        if (req.query.page === "" || req.query.size === "")
            res.json(new BaseError(500, "page or size needs to be filled"))

        this.postUseCase
            .listPost(
                { page: Number(req.query.page), size: Number(req.query.size) },
                user.id
            )
            .then(({ pagination, posts }) => {
                res.json({
                    message: "success",
                    pagination,
                    posts,
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

    commentPost = (
        req: Request<{ postId: string }, {}, { comment: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.commentUseCase
            .createComment(user, req.params.postId, req.body.comment)
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    updateComment = (
        req: Request<
            { postId: string; commentId: string },
            {},
            { comment: string }
        >,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.commentUseCase
            .updateComment(
                user,
                req.params.postId,
                req.params.commentId,
                req.body.comment
            )
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    deleteComment = (
        req: Request<{ postId: string; commentId: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const user = getUserFromHeader(req)
        this.commentUseCase
            .deleteComment(user, req.params.postId, req.params.commentId)
            .then(() => {
                res.json({
                    message: "success",
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    listComment = (
        req: Request<
            { postId: string },
            {},
            {},
            { page: string; size: string }
        >,
        res: Response,
        next: NextFunction
    ) => {
        this.commentUseCase
            .listComment(
                { page: Number(req.query.page), size: Number(req.query.size) },
                req.params.postId
            )
            .then(({ pagination, comments }) => {
                res.json({
                    message: "success",
                    pagination,
                    comments,
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

export default PostController
