interface Config {
    restPort: string
    mongo: {
        host: string
    }
    jwtSecret: string
}

export { Config }

export default {
    restPort: process.env.PORT || "3000",
    mongo: {
        host: process.env.MONGODB_HOST,
    },
    jwtSecret: process.env.JWT_SECRET || "xxx",
}
