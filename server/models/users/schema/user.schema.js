import mongoose, { Schema } from "mongoose";

export const UserSchema = new mongoose.model('users', {
    username: {
        type: String,
        require: true,
        unique: true,
    },
    todo: [String],
    todoObj: [{ complete: Boolean, todoValue: String, todoId: Number }],
    password: String,
})