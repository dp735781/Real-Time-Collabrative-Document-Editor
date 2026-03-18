const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/editorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Document = mongoose.model("Document", {
  data: Object
})
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send-changes", (data) => {
    socket.broadcast.emit("receive-changes", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});