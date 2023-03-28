import { connect} from "mongoose"
//DATABASE CONNECTION 
export default function connects():Promise<void>{
    return connect('mongodb://127.0.0.1:27017/todoappdatabase')
        .then(() => {
            console.log(`database conection successfully`)
        }).catch((err:any) => {
            console.log(err)
        })
}