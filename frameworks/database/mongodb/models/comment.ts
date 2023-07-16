import mongoose from "mongoose"
import { v4 } from "uuid"

export interface Comment {
    id: string
    postId: string
    userId: string
    comment: string
    createdAt: Date
}

const CommentSchema = new mongoose.Schema<Comment>({
    id: {
        type: String,
        default: (): string => {
            return v4()
        },
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

CommentSchema.index({ id: 1, userId: 1 })

const CommentModel = mongoose.model("comment", CommentSchema)

CommentModel.ensureIndexes()

export default CommentModel
