
import {Schema} from "mongoose";
import { User } from "../models/userModel";






//DATABASE SHEMA

const userschema = new Schema<User>({
    name: { type: String, required: [true, "user name is required"] },
    description: { type: String, required: [true, "description is required"] },
    status: { type: String, required: [true, "status is required"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export {userschema}