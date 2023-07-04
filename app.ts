import express from "express"
import mongoose from "mongoose"
import config from "./config/config"
import connect from "./frameworks/database/mongodb/connection"
import initExpress from "./frameworks/webserver/express"

const app: express.Express = express()
const port: Number = 3000

// init express
initExpress(app)

// Init mongoose
connect(mongoose, config, {
    connectTimeoutMS: 1000,
    autoIndex: false,
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
