import mongoose from "mongoose"
import { v4 } from "uuid"
import { Post, Comment } from "../../../../src/entity/post"

const CommentSchema = new mongoose.Schema<Comment>()

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
    comments: [CommentSchema],
    likeCount: {
        type: Number,
    },
    commentCount: {
        type: Number,
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
