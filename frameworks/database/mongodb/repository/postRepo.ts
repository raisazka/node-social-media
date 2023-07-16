import { Service } from "typedi"
import { Post } from "../../../../src/entity/post"
import { Comment } from "../models/comment"
import PostModel from "../models/post"
import CommentModel from "../models/comment"
import BaseError from "../../../../utils/err/baseError"
import Pagination from "../../../../utils/pagination/pagination"

@Service()
class PostRepository {
    createPost = async (userId: string, content: string) => {
        await PostModel.create({
            userId,
            content,
            createdAt: Date.now(),
        })
    }
    updatePost = async (postId: string, content: string) => {
        await PostModel.updateOne({ id: postId }, { content })
    }
    getPost = async (postId: string): Promise<Post> => {
        return await PostModel.findOne({ id: postId })
    }

    deletePost = async (postId: string) => {
        return await PostModel.deleteOne({ id: postId })
    }

    listPostFromFollowings = async (
        pagination: Pagination,
        userId: string,
        followingsId: string[]
    ): Promise<Post[]> => {
        const users = await PostModel.find<Post>({
            userId: {
                $in: [...followingsId, userId],
            },
        })
            .sort({ created_at: -1 })
            .skip(pagination.size * pagination.page - pagination.size)
            .limit(pagination.size)

        return users
    }

    countPostsFromFollowings = async (
        userId: string,
        followingsId: string[]
    ): Promise<number> => {
        return await PostModel.count({
            userId: {
                $in: [...followingsId, userId],
            },
        })
    }
    // if increment is false then decrement the like count value
    incrementLikeCount = async (postId: string, inc: boolean) => {
        await PostModel.updateOne(
            { id: postId },
            {
                $inc: {
                    likeCount: inc ? 1 : -1,
                },
            }
        )
    }
    likePost = async (postId: string, userId: string) => {
        try {
            const document = await PostModel.findOne({ id: postId })

            if (!document) throw new BaseError(500, "post not found")

            if (!document.userLikes) {
                document.$set({
                    userLikes: {},
                })
            }

            document.userLikes.set(userId, true)
            await document.save()
        } catch (err) {
            throw new BaseError(500, err)
        }
    }

    removeLike = async (postId: string, userId: string) => {
        try {
            const document = await PostModel.findOne({ id: postId })

            if (!document) throw new BaseError(500, "post not found")

            document.userLikes.delete(userId)
            await document.save()
        } catch (err) {
            throw new BaseError(500, err)
        }
    }
    addComment = async (userId: string, postId: string, comment: string) => {
        await CommentModel.create({
            userId,
            postId,
            comment,
        })
    }

    incrementCommentCount = async (postId: string, incr: boolean) => {
        await PostModel.updateOne(
            { id: postId },
            {
                $inc: {
                    commentCount: incr ? 1 : -1,
                },
            }
        )
    }

    deleteComment = async (postId: string, commentId: string) => {
        await CommentModel.deleteOne({
            postId: postId,
            id: commentId,
        })
    }
    getComment = async (
        postId: string,
        commentId: string
    ): Promise<Comment> => {
        return await CommentModel.findOne<Comment>({
            id: commentId,
            postId: postId,
        })
    }
    listComment = async (
        pagination: Pagination,
        postId: string
    ): Promise<Comment[]> => {
        return await CommentModel.find<Comment>({
            postId: postId,
        })
            .sort({ created_at: -1 })
            .skip(pagination.size * pagination.page - pagination.size)
            .limit(pagination.size)
    }

    updateComment = async (commentId: string, comment: string) => {
        return await CommentModel.updateOne(
            {
                id: commentId,
            },
            {
                comment,
            }
        )
    }
}

export default PostRepository
