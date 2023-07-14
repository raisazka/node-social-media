import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import config from "../../config/config"

const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const compare = (password: string, hashedPassword: string) =>
    bcrypt.compareSync(password, hashedPassword)

const verify = (token: string) => jwt.verify(token, config.jwtSecret)

const generateToken = (id: string, email: string, password: string) =>
    jwt.sign({ id, email, password }, config.jwtSecret, {
        expiresIn: 360000,
    })

export { encryptPassword, compare, verify, generateToken }
