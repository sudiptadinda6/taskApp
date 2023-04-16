import   express from 'express';
import connects from './config/db';
import { router } from "./router/router";
import bodyParser  from 'body-parser';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port :number =4000



app.use('/',router)



app.listen(port,():void =>{
    console.log(`server is running localhost:${port}`)
    connects()
})