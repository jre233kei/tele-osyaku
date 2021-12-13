const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const ids = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  ids.push(socket.id);
  console.log("a user connected");

  socket.emit("client-connect", socket.id);

  socket.on("rotate", (args) => {
    console.log("args", args);
    io.to(args.to).emit("rotate-react", args);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
