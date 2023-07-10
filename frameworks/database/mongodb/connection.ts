import mongoose from "mongoose"
import { Config } from "../../../config/config"

export default function connect(
    mongoose: mongoose.Mongoose,
    config: Config,
    options: mongoose.ConnectOptions
) {
    const connection = () => {
        mongoose
            .connect(config.mongo.host, options)
            .then(
                () => {},
                (err) => {
                    console.error("[connection] error connect mongodb: ", err)
                }
            )
            .catch((err) => {
                console.log("[connection] error connect mongodb:", err)
            })
    }

    mongoose.connection.on("connected", () => {
        console.info("Connected to MongoDB!")
    })

    mongoose.connection.on("reconnected", () => {
        console.info("MongoDB reconnected!")
    })

    mongoose.connection.on("error", (error) => {
        console.error(`Error in MongoDb connection: ${error}`)
        mongoose.disconnect()
    })

    mongoose.set("debug", true)

    return {
        connection,
    }
}
