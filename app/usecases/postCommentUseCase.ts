import { Inject, Service } from "typedi"
import "reflect-metadata"
import User from "../../src/entity/user"
import BaseError from "../../utils/err/baseError"
import { CommentResponse } from "../../src/entity/post"
import UserRepository from "../../frameworks/database/mongodb/repository/userRepo"
import PostRepository from "../../frameworks/database/mongodb/repository/postRepo"
import Pagination from "../../utils/pagination/pagination"

interface ListCommentResponse {
    comments: CommentResponse[]
    pagination: Pagination
}

@Service()
class PostCommentUseCase {
    @Inject()
    postRepo: PostRepository
    @Inject()
    userRepo: UserRepository

    createComment = async (user: User, postId: string, comment: string) => {
        await this.postRepo.addComment(user.id, postId, comment)

        await this.postRepo.incrementCommentCount(postId, true)
    }

    deleteComment = async (user: User, postId: string, commentId: string) => {
        const comment = await this.postRepo.getComment(postId, commentId)

        if (comment.userId !== user.id)
            throw new BaseError(500, "can't delete other user comment")

        await this.postRepo.deleteComment(postId, commentId)

        await this.postRepo.incrementCommentCount(postId, false)
    }

    listComment = async (
        pagination: Pagination,
        postId: string
    ): Promise<ListCommentResponse> => {
        const comments = await this.postRepo.listComment(pagination, postId)

        const userIds = comments.map((c) => {
            return c.userId
        })

        const users = await this.userRepo.findUsersByIds(userIds)

        const commentUserMap: Map<string, User> = new Map()

        comments.forEach((c) => {
            users.forEach((u) => {
                if (c.userId === u.id) {
                    commentUserMap.set(c.id, u)
                }
            })
        })

        const mappedComment: CommentResponse[] = comments.map((c) => {
            return {
                comment: c.comment,
                id: c.id,
                user: {
                    id: commentUserMap.get(c.id).id,
                    name: commentUserMap.get(c.id).name,
                },
                createdAt: c.createdAt,
            }
        })

        const post = await this.postRepo.getPost(postId)

        return {
            pagination: {
                page: pagination.page,
                size: pagination.size,
                totalItem: post.commentCount,
            },
            comments: mappedComment,
        }
    }

    updateComment = async (
        user: User,
        postId: string,
        commentId: string,
        commentContent: string
    ) => {
        const comment = await this.postRepo.getComment(postId, commentId)

        if (comment.userId !== user.id)
            throw new BaseError(500, "can't update other user comment")

        await this.postRepo.updateComment(commentId, commentContent)
    }
}

export default PostCommentUseCase
