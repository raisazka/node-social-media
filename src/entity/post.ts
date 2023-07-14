interface Post {
    id: string
    userId: string
    content: string
    likeCount: Number
    commentCount: Number
    userLikes: Map<string, boolean>
    comments: Map<string, Comment>
    updatedAt: Date
    createdAt: Date
}

export default Post
