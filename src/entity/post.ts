import mongoose from "mongoose"

export interface Comment {
    user: {
        name: string
    }
    content: string
}

export interface Post {
    _id: mongoose.ObjectId
    id: string
    userId: string
    content: string
    likeCount: Number
    commentCount: Number
    userLikes: Map<string, boolean>
    comments: Comment[]
    updatedAt: Date
    createdAt: Date
}
