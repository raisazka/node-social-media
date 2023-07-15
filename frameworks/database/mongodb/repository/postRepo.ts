import { Service } from "typedi"
import { Post } from "../../../../src/entity/post"
import PostModel from "../models/post"
import BaseError from "../../../../utils/err/baseError"

@Service()
class PostRepository {
    createPost = async (userId: string, content: string) => {
        await PostModel.create({
            userId,
            content,
        })
    }
    updatePost = async (postId: string, content: string) => {
        await PostModel.updateOne({ id: postId }, { content })
    }
    getPost = async (postId: string): Promise<Post> => {
        return await PostModel.findOne({ id: postId })
    }
    deletePost = () => {}
    listPost = async () => {}
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
}

export default PostRepository
