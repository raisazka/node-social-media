import express from "express"
import mongoose from "mongoose"
import config from "./config/config"
import connect from "./frameworks/database/mongodb/connection"
import initExpress from "./frameworks/webserver/express"
import "reflect-metadata"
import routes from "./frameworks/webserver/routes"
import Container from "typedi"
import AuthController from "./adapters/auth"
import errorHandlingMiddlware from "./frameworks/webserver/middlewares/error"

const app: express.Express = express()
const router: express.Router = express.Router()
const port: Number = 3000

// init express
initExpress(app)

// Init mongoose
connect(mongoose, config, {
    connectTimeoutMS: 1000,
    autoIndex: false,
}).connection()

const authController = Container.get(AuthController)
routes(app, router, authController)

app.use(errorHandlingMiddlware)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

export default app
