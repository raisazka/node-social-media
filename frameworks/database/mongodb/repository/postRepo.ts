import Post from "../../../../src/entity/post"
import PostModel from "../models/post"

class PostRepository {
    createPost = async (userId: string, content: string) => {
        await PostModel.create({
            userId,
            content,
        })
    }
    updatePost = async (postId: string, content: string) => {
        await PostModel.findOneAndUpdate({ id: postId }, { content })
    }
    getPost = async (postId: string): Promise<Post> => {
        return await PostModel.findById({ id: postId })
    }
    deletePost = () => {}
    listPost = () => {}
    incrementLikeCount = () => {}
    likePost = () => {}
}

export default PostRepository
