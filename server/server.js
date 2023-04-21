import express from 'express'
import dotenv from 'dotenv'
import { userController } from './models/users/user.controller.js'
import { todoController } from './models/users/todo.controller.js'
import mongoose from 'mongoose'
import cors from 'cors'
// port and host
export const PORT = 8080
export const URL = 'localhost'

const app = express()
const router = express.Router()

// app.use(process.env.MONGO_USER_URL)
dotenv.config()
// app.set("trust proxy", true)
app.use("./netlify/functions/api",router)
app.use(express.json())
app.use(cors())
app.use("/users", userController)
app.use("/todo", todoController)
// app.use("/todo")


async function connectToDataBase() {

    try {

        await mongoose.connect(process.env.MONGO_USER_URL.toString())
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
