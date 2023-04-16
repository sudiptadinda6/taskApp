
import {Schema} from "mongoose";
import { TaskStatus, User } from "../models/userModel";






//DATABASE SHEMA

const userschema = new Schema<User>({
     name: { type: String, required: [true, "user name is required"] },
    description: { type: String},
    status: {type:String,enum:TaskStatus},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export {userschema}