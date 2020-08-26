const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/message");
const index = require("./routes/index");
const connectDB = require("./config/db");
const User = require("./models/User");
const Message = require("./models/Message");


const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/user");
const { error } = require("console");

const app = express();
connectDB();
const server = http.createServer(app);
const io = socketio(server);

const botName = "Chat Bot";

app.use(index);

//Run when client connets
io.on(
  "connection",
  (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      if(user === null) {
        return socket.emit('exception', {errorMessage: `Nick Name ${username} alrady exist`});
      }
      socket.join(user.room);
      const newUser = new User({
        nickName: username
      })
       newUser.save()
       .catch(err => console.log(err));

      // Welcome current user
      socket.emit("message", formatMessage(botName, "Welcome to Chat!"));

      //Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(botName, `${user.username} has join the chat`)
        );

      // Send users room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit("message", formatMessage(user.username, msg));
      const newMessage = new Message({
        message: msg,
        userName: user.username,
        room: user.room
      });
      newMessage.save()
       .catch(err => console.log(err));
    });

    //When client disconnect
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage(botName, `${user.username} has left the chat`)
        );

        // Send users room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  },
  (err) => {
    throw error(err);
  }
);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
