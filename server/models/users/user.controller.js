import express from 'express'

export const userController = express()


userController.post("/newuser", (req, res) => {
    res.send("new user created")
    console.log(req.body)
})