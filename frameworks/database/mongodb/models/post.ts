import mongoose from "mongoose"
import { v4 } from "uuid"
import Post from "../../../../src/entity/post"

interface Comment {
    user: {
        name: string
    }
    content: string
}

const PostSchema = new mongoose.Schema<Post>({
    id: {
        default: (): string => {
            return v4()
        },
        required: true,
    },
    userId: {
        required: true,
    },
    content: {
        required: true,
    },
    comments: {
        type: Map,
        of: Comment,
    },
    likeCount: {
        default: 0,
    },
    commentCount: {
        default: 0,
    },
    userLikes: {
        type: Map,
        of: Boolean,
    },
    updatedAt: Date,
    createdAt: Date,
})

PostSchema.index({ id: 1, userId: 1 })

const PostModel = mongoose.model("post", PostSchema)

PostModel.ensureIndexes()

export default PostModel
