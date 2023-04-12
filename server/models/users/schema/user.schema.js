import mongoose, { Schema } from "mongoose";

export const UserSchema = new mongoose.model('users',{
    username: {
        type:String,
        require:true,
    },
    password: String,
})