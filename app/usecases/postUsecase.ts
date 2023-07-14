import { Inject, Service } from "typedi"
import { Request } from "express"
import "reflect-metadata"
import PostRepository from "../../frameworks/database/mongodb/repository/postRepo"
import BaseError from "../../utils/err/baseError"
import User from "../../src/entity/user"

export interface CreatePostRequest {
    attachments?: string[]
    content: string
}

@Service()
class PostUseCase {
    @Inject()
    postRepo: PostRepository

    createPost = async (user: User, post: CreatePostRequest): Promise<void> => {
        if (!user) throw new BaseError(500, "user not defined")
        return this.postRepo.createPost(user.id, post.content)
    }

    updatePost = async (
        user: User,
        postId: string,
        content: string
    ): Promise<void> => {
        const post = await this.postRepo.getPost(postId)
        if (!post || post.userId !== user.id)
            throw new BaseError(500, "post not found")

        return await this.postRepo.updatePost(postId, content)
    }
}

export default PostUseCase
