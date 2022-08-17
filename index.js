const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);

app.set("port", process.env.PORT || 8080);
const PORT = app.get("port");
app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/index.html"));
});
io.on("connection", (socket) => {
  console.log("성공");
  socket.on("kekeo", (data) => {
    const time = moment(new Date()).format("A hh:mm");
    io.emit("kekeo", { name: data.name, msg: data.msg, time: time });
  });
});
server.listen(PORT, () => {
  console.log(`${PORT}포트`);
});
