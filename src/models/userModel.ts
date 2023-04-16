import {model} from "mongoose";
import { userschema } from "../databaseShema/shemauser";


//INTERFACE FOR DATABASE

enum TaskStatus {
    DONE='done',
    IN_PROGRESS='in-progress',
    CANCELLED='cancelled',
    CREATED ='created',
    DELETED ='deleted',
}


interface User {
    name: string,
    description: string,
    status:TaskStatus,
    createdAt:any,
    updatedAt:any,

}



//DATABASE MODELS
// @ts-ignore
const userDataTodoApp =  model("userdatatodos", userschema)

export { userDataTodoApp, User,TaskStatus}
