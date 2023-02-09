const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const talkRoutes = require("./routes/talkRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {  cors: {
  origin: "http://localhost:3000",
}});
dotenv.config();
connectDB();

let onlineUsers = [];

const addNewUser = (name, socketId) => {
  !onlineUsers.some((user) => user.name === name) &&
    onlineUsers.push({ name, socketId });
    console.log(name + '' + 'added as new user')
    console.log(onlineUsers)
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (name) => {
  return onlineUsers.find((user) => user.name === name);
};

const addTalk = (user, talk) => {

}

io.on("connection", (socket) => {
  console.log('user connected')
  socket.on('newUser', (user) => {
    let name = user ? user.name : ''
    addNewUser(name, socket.id)
  })
  socket.on('sendNotification', ({sender, type, resp}) => {
    socket.broadcast.emit('getNotification', {
      sender,
      type,
      resp
    })
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
    console.log('user disconnected')
  })
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  ); // to accept json data

app.use('/api/user',userRoutes);
app.use('/api/talks',talkRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



httpServer.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);