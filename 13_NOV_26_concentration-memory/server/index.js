import express from "express"
import {createServer} from "node:http"
import {fileURLToPath} from "node:url"
import {dirname, join} from "node:path"
import {Server} from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load static assets eg: *.css, *.js...
app.use(express.static("assets"))
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../app/index.html"))
})

// async function totalCount() {
//   const sockets = await io.fetchSockets()
//   return sockets.length
// }
// const count = await totalCount()
// console.log({count})
// -------------------------------

io.on("connection", (socket) => {
  console.log("a user connected")

  // const userId = computeUserId(socket)
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("user name", (user) => {
    console.log("user: ", user)
    io.emit("user name", user)
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
