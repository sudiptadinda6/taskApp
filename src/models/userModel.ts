import {model} from "mongoose";
import { userschema } from "../databaseShema/shemauser";


//INTERFACE FOR DATABASE

interface User {
    name: string,
    description: string,
    status:string,
    createdAt:any,
    updatedAt:any,

}



//DATABASE MODELS
// @ts-ignore
const userDataTodoApp =  model("userdatatodos", userschema)

export { userDataTodoApp, User}
