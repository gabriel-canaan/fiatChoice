const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
require('dotenv').config();
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      process.env.GREEN_API, { headers: { Authorization: process.env.GREEN_AUTH }
    });
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));