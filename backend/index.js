const express = require("express")
const  router  = require("./Routes/AuthRouter")
const app = express()
const conn = require("./database/dbConfig")
const bodyParser = require("body-parser")
const cors = require("cors");

require("dotenv").config()
const botName = process.env.botName

const http = require("http");
const { Server } = require("socket.io");
const formatMessage = require("./Utils/message")
const userJoin = require("./Utils/users")
app.use(express.static('../client/src'))


app.get('/' , (req , res) => {
    res.send("/ req is executed")
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use(cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, DELETE, PATCH",
}))

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
        methods: "GET, POST, DELETE, PATCH",
        credentials: true,
  },
});


io.on("connection", (socket) => {
  
  // console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    socket.to(data).emit("get_user", data);

  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("data is" , data)

  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })

  });


server.listen(8001 , () => {
    console.log("Server is listening at 8001")
})

app.use(router)
