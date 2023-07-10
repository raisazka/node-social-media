import User from "./user"
import { Request } from "express"

export interface ExtendedRequest extends Request {
    user?: User
}
