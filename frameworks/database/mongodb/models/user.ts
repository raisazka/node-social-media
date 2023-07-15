import mongoose from "mongoose"
import { v4 } from "uuid"
interface User {
    id: string
    email: string
    password: string
    role: string
    name: string
    followers: String[]
    followings: String[]
    createdAt: Date
}

const UserSchema = new mongoose.Schema<User>({
    id: {
        type: String,
        default: (): string => {
            return v4()
        },
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "test_user",
    },
    name: {
        type: String,
        required: true,
    },
    followings: [String],
    followers: [String],
    createdAt: Date,
})

UserSchema.index({ id: 1, email: 1 })

const UserModel = mongoose.model("user", UserSchema)

UserModel.ensureIndexes()

export default UserModel
