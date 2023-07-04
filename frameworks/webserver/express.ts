import morgan from "morgan"
import compression from "compression"
import bodyParser from "body-parser"
import helmet from "helmet"
import express from "express"

export default (app: express.Application) => {
    // security middleware
    app.use(helmet())

    app.use(compression())
    app.use(bodyParser.json({ limit: "1mb" }))
    app.use(
        bodyParser.urlencoded({
            limit: "1mb",
            extended: true,
            parameterLimit: 50000,
        })
    )

    app.use((_, res: express.Response, next: express.NextFunction) => {
        // Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
        // Request methods you wish to allow
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        )
        // Request headers you wish to allow
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, Content-type, Authorization, Cache-control, Pragma"
        )
        // Pass to next layer of middleware
        next()
    })
    app.use(morgan("combined"))
}
