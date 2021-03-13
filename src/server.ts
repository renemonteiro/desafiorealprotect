import express, {Express} from "express"
import cors from "cors"
import {data} from './routes/dataRouter'


const app : Express = express()
app.use(express.json())
app.use(cors())
app.use(data) 

app.listen(process.env.PORT || 3003, ()=>{
		console.log(`Server is running at port 3003`)
})