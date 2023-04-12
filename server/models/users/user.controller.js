import express from 'express'
import mongoose from 'mongoose'

import { UserSchema } from './schema/user.schema.js'

export const userController = express()


userController.post("/register", (req, res) => {
    const { username, password } = req.body
    if (username.length >= 4 && password.length >= 4) {
        const newUser = new UserSchema(req.body)
        newUser.save()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                throw err
            })
    }
    else {
        console.log("something went wrong!")
    }
    res.send("user posted")
})

userController.get("/login", async (req, res) => {
    var currentUser = await UserSchema.findOne({ username: req.body.username }).exec()

    if (currentUser) {
        res.status(200).json(currentUser)
    }
    else {
        res.status(404).json("not found!")
    }
})

userController.delete("/delete", async (req, res) => {
    var deletedUser = await UserSchema.findOneAndDelete(
        {
            username: req.body.username,
            passowrd: req.body.passowrd
        }
    )
    if (deletedUser) {
        console.log("user has been deleted")
        res.status(200).json(deletedUser)
    }
    else {
        console.log("something wrong")
        res.status(400).json("not deleted")
    }
})