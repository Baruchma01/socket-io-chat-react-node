import React, { useState, useEffect } from "react";
import classes from "./Chat.css";
import openSocket from "socket.io-client";
const socket = openSocket(process.env.REACT_APP_API_URI);
const Chat = ({ location }) => {
  const [msg, setMsg] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const { username, room } = location.state.user;

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
  }, []);

  // Get message from the server
  socket.on("message", (message) => {
    setRoomMessage([...roomMessage, message]);
  });

  // Get room and users
  socket.on("roomUsers", ({ room, users }) => {
    setActiveUsers(users);
    setCurrentRoom(room);
  });

  const submitMessageHandler = (e) => {
    e.preventDefault();
    if (msg.length === 0) {
      alert("error: empty msg");
    } else {
      socket.emit("chatMessage", msg);
      setMsg('');
    }
  };

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div className={classes.ChatContainer}>
      <header className={classes.ChatHeader}>
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <a href="/" className={classes.Btn}>
          Leave Room
        </a>
      </header>
      <main className={classes.ChatMain}>
        <div className={classes.ChatSideBar}>
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{currentRoom}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            {(activeUsers || []).map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className={classes.ChatMessage}>
          {(roomMessage || []).map((message) => (
            <div key={Math.random()} className={classes.Message}>
              <p className={classes.Meta}>
                {message.username} <span>{message.time}</span>
              </p>
              <p className="text">{message.text}</p>
            </div>
          ))}
        </div>
      </main>
      <div className={classes.ChatFormContainer}>
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={msg}
            onChange={handleMsgChange}
          />
          <button className={classes.Btn} onClick={submitMessageHandler}>
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
