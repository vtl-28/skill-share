const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const talkRoutes = require("./routes/talkRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
dotenv.config();
connectDB();

let onlineUsers = [];

const addNewUser = (name, socketId) => {
  !onlineUsers.some((user) => {
    return user.name === name;
  }) && onlineUsers.push({ name, socketId });
  console.log(`${name} added as new user`);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => {
    return user.socketId !== socketId;
  });
};

const getUser = (name) => {
  return onlineUsers.find((user) => {
    return user.name === name;
  });
};

io.on("connection", (socket) => {
  socket.on("newUser", (user) => {
    const name = user ? user.name : "";
    addNewUser(name, socket.id);
  });
  socket.on("create talk", ({ sender, type, response }) => {
    socket.broadcast.emit("create talk notification", {
      id: uuidv4(),
      sender,
      type,
      response,
    });
  });

  socket.on("like talk", ({ sender, response, type }) => {
    const receiver = getUser(response.hostedBy.name);

    socket.join(receiver.socketId);

    io.to(receiver.socketId).emit("like notification", {
      id: uuidv4(),
      sender,
      response,
      type,
    });
  });

  socket.on("comment talk", ({ sender, response, type }) => {
    const receiver = getUser(response.hostedBy.name);
    socket.join(receiver.socketId);

    io.to(receiver.socketId).emit("comment notification", {
      id: uuidv4(),
      sender,
      response,
      type,
    });
  });

  socket.on("attend talk", ({ sender, response, type }) => {
    const receiver = getUser(response.hostedBy.name);
    socket.join(receiver.socketId);

    io.to(receiver.socketId).emit("attend talk notification", {
      id: uuidv4(),
      sender,
      response,
      type,
    });
  });

  socket.on("cancel talk", ({ sender, response, type }) => {
    const receiver = getUser(response.hostedBy.name);
    socket.join(receiver.socketId);

    io.to(receiver.socketId).emit("cancel talk notification", {
      id: uuidv4(),
      sender,
      response,
      type,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected");
  });
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); // to accept json data

app.use("/api/user", userRoutes);
app.use("/api/talks", talkRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

httpServer.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
