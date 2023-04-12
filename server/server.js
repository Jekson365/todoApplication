import express from 'express'
import { userController } from './models/users/user.controller.js'

// port and host
export const PORT = 8080
export const URL = 'localhost'

const app = express()

app.use("/users",userController)
// app.use("/todo")

app.listen(PORT,URL,()=> {
    console.log("server is listening at port " + PORT)
})