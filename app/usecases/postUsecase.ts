import { Inject, Service } from "typedi"
import "reflect-metadata"
import PostRepository from "../../frameworks/database/mongodb/repository/postRepo"
import BaseError from "../../utils/err/baseError"
import User from "../../src/entity/user"
import UserRepository from "../../frameworks/database/mongodb/repository/userRepo"
import Pagination from "../../utils/pagination/pagination"
import { Post } from "../../src/entity/post"

export interface CreatePostRequest {
    attachments?: string[]
    content: string
}

// TODO: split to dto
interface PostResponse {
    id: string
    user: {
        id: string
        name: string
    }
    content: string
    likeCount: number
    commentCount: number
    createdAt: Date
}

export interface ListPostResponse {
    posts: PostResponse[]
    pagination: Pagination
}

@Service()
class PostUseCase {
    @Inject()
    postRepo: PostRepository
    @Inject()
    userRepo: UserRepository

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

    deletePost = async (
        user: User,
        postId: string,
        commentId: string
    ): Promise<void> => {
        const comment = await this.postRepo.getComment(postId, commentId)
        if (comment.userId !== user.id)
            throw new BaseError(500, "can't delete other user post")

        await this.postRepo.deleteComment(postId, commentId)
    }

    likePost = async (user: User, postId: string): Promise<void> => {
        const post = await this.postRepo.getPost(postId)
        if (!post) throw new BaseError(500, "post not found")

        if (post.userLikes && post.userLikes.has(user.id)) {
            await this.postRepo.removeLike(postId, user.id)
            return await this.postRepo.incrementLikeCount(postId, false)
        }

        await this.postRepo.likePost(postId, user.id)

        return await this.postRepo.incrementLikeCount(postId, true)
    }

    listPost = async (
        pagination: Pagination,
        userId: string
    ): Promise<ListPostResponse> => {
        const user = await this.userRepo.getUserById(userId)
        const posts = await this.postRepo.listPostFromFollowings(
            pagination,
            userId,
            user.followings
        )
        const countPosts = await this.postRepo.countPostsFromFollowings(
            userId,
            user.followings
        )
        const userIds = posts.map((p) => {
            return p.userId
        })

        const users = await this.userRepo.findUsersByIds(userIds)
        const postUserMap: Map<string, User> = new Map()

        posts.forEach((p) => {
            users.forEach((u) => {
                if (p.userId === u.id) {
                    postUserMap.set(p.id, u)
                }
            })
        })

        const mappedPost: PostResponse[] = mapPost(posts, postUserMap)

        return {
            pagination: {
                page: pagination.page,
                size: pagination.size,
                totalItem: countPosts,
            },
            posts: mappedPost,
        }
    }
}

const mapPost = (
    posts: Post[],
    postUserMap: Map<string, User>
): PostResponse[] => {
    return posts.map((p) => {
        return {
            id: p.id,
            user: {
                id: postUserMap.get(p.id).id,
                name: postUserMap.get(p.id).name,
            },
            content: p.content,
            createdAt: p.createdAt,
            commentCount: p.commentCount,
            likeCount: p.likeCount,
        }
    })
}

export default PostUseCase
