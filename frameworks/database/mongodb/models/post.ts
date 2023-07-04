import mongoose from "mongoose"
import { v4 } from "uuid"

interface Post {
    id: string
    userId: string
    content: string
    likeCount: Number
    comments: Comment[]
    updatedAt: Date
    createdAt: Date
}

interface Comment {
    user: {
        name: string
    }
    content: string
}

const PostSchema = new mongoose.Schema<Post>({
    id: {
        type: String,
        default: (): string => {
            return v4()
        },
        required: true,
    },
    content: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comments: [
        {
            user: {
                name: String,
            },
            content: String,
        },
    ],
    likeCount: {
        type: Number,
    },

    createdAt: Date,
})

PostSchema.index({ id: 1, email: 1 })

const PostModel = mongoose.model("post", PostSchema)

PostModel.ensureIndexes()

export default PostModel
