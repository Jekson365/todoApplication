import mongoose from "mongoose";
import express from 'express'
import { UserSchema } from "./schema/user.schema.js";

export const todoController = express()


todoController.post("/newtodo/:user", async (req, res) => {
    const { username, todo } = req.body
    try {

        console.log(username)
        const result = await UserSchema.findOneAndUpdate(
            { username: req.params.user },
            { $push: { todo: todo } },
            { new: true }
        )

        res.status(200).json(result)
    }
    catch (err) {
        res.status(404).json("not found!")
        throw err
    }

})

todoController.get("/:user", async (req, res) => {
    try {
        const currentUserData = await UserSchema.findOne({ username: req.params.user })
        if (currentUserData) {
            res.status(200).json(currentUserData)
        }
        else {
            console.log(currentUserData)
            res.status(404).json("not found!")
        }
    }

    catch (err) {
        throw err
    }
})
todoController.post("/delete/:user", async (req, res) => {
    try {
        const currentTodo = await UserSchema.updateOne(
            { username: req.params.user },
            { $pullAll: { todo: [req.body.todo] } }
        )
        console.log(currentTodo)
        res.status(200).json(currentTodo)
    }
    catch (err) {
        throw err
    }
})
