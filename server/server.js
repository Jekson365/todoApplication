import express from 'express'
import dotenv from 'dotenv'
import { userController } from './models/users/user.controller.js'
import mongoose from 'mongoose'

// port and host
export const PORT = 8080
export const URL = 'localhost'

const app = express()

// app.use(process.env.MONGO_USER_URL)
dotenv.config()
app.use(express.json())
app.use("/users", userController)
// app.use("/todo")


async function connectToDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_USER_URL)
        console.log("connected to mongoDB")
    }
    catch (err) {
        throw err
    }
}

app.listen(PORT, URL, () => {
    console.log("server is listening at port " + PORT)
    connectToDataBase()
})