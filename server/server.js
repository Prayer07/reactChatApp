import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import User from "./models/user.model.js"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express()
const port = 2007

app.use(cors())
app.use(express.json())

app.use("/", userRouter)

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Connected")
    app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})
})
.catch(() => {
    console.log("couldn't connect")
})