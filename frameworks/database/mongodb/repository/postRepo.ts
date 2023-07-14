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
    incrementLikeCount = async (postId: string) => {
        await PostModel.updateOne(
            { id: postId },
            {
                $inc: {
                    likeCount: 1,
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
}

export default PostRepository
