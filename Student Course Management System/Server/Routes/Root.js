import express from "express"

export const rootRouter = express.Router()

rootRouter.route("/")
    .get((req, res) => {
        res.send("<h1>Hello How are you</h1>")
    })