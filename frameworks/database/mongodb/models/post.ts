import mongoose from "mongoose"
import { v4 } from "uuid"
import { Post } from "../../../../src/entity/post"

const PostSchema = new mongoose.Schema<Post>({
    id: {
        type: String,
        default: (): string => {
            return v4()
        },
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    userLikes: {
        type: Map,
        of: Boolean,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

PostSchema.index({ id: 1, userId: 1 })

const PostModel = mongoose.model("post", PostSchema)

PostModel.ensureIndexes()

export default PostModel
