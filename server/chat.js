import express from "express"
import http from "http"
import {Server} from "socket.io" 
import cors from "cors"

const app = express()
const server = http.createServer(app)
const port = 3000

app.use(cors())
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log("User connected:", socket.id)

    socket.on('send-message', (data) => {
        console.log('Received:', data)
        io.emit('receive-message', data)
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

server.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
})