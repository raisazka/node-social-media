import express from "express"

export default function errorHandlingMiddlware(
    error: any,
    req: Express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.status(error.statusCode || 500).json({
        error: {
            statusCode: error.statusCode || 500,
            message: error.message,
        },
    })
    next(error)
}
