import mongoose from "mongoose"

export interface CommentResponse {
    id: string
    user: {
        id: string
        name: string
    }
    comment: string
    createdAt: Date
}

export interface Post {
    _id: mongoose.ObjectId
    id: string
    userId: string
    content: string
    likeCount: number
    commentCount: number
    userLikes: Map<string, boolean>
    comments: Comment[]
    updatedAt: Date
    createdAt: Date
}
