import React, { useState, useEffect, useRef } from "react";
import classes from "./Chat.css";
import openSocket from "socket.io-client";
import Spinner from "../../components/Spinner/Spinner";

const socket = openSocket(process.env.REACT_APP_API_URI);
const Chat = ({ location }) => {
  const divRref = useRef(null);
  const [msg, setMsg] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const { username, room } = location.state.user;

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
  }, []);

  useEffect(() => {
    // Get message from the server
    socket.on("message", (message) => {
      setRoomMessage((state) => [...state, message]);
      if (roomMessage.length > 0) {
        divRref.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      setActiveUsers((state) => users);
      setCurrentRoom((state) => room);
    });
  }, []);

  const submitMessageHandler = (e) => {
    e.preventDefault();
    if (msg.length === 0) {
      alert("error: empty msg");
    } else {
      socket.emit("chatMessage", msg);
      setMsg("");
    }
  };

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>
      {!socket.connected ? (
        <Spinner />
      ) : (
        <div className={classes.ChatContainer}>
          <div className={classes.ChatHeader}>
            <div className={classes.Dots}>
              <i
                className="fa fa-circle fa-xs"
                style={{ color: "#f57e7d" }}
              ></i>
              <i
                className="fa fa-circle fa-xs"
                style={{ color: "#ffc881" }}
              ></i>
              <i
                className="fa fa-circle fa-xs"
                style={{ color: "#82cf85" }}
              ></i>
            </div>
            <div>
              <p style={{ margin: 0 }}>Code Chat</p>
            </div>
            <div>
              <i class="fa fa-expand"></i>
            </div>
          </div>
          <div className={classes.ChatSection}>
            <div className={classes.ConversationList}>
              <ul>
                <div className={classes.List}>
                  <i class="fa fa-list-alt"></i>
                  <li>Dashboard</li>
                </div>
                <div className={classes.List}>
                  <li>Team chat</li>
                </div>
                <div className={classes.List}>
                  <li>baruch</li>
                </div>
                <div className={classes.List}>
                  <li>moshe</li>
                </div>
                <div className={classes.List}>
                  <li>eran</li>
                </div>
              </ul>
            </div>

            <div className={classes.ChatArea}></div>

            <div className={classes.RightTabs}></div>
          </div>

          {/* <header className={classes.ChatHeader}>
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
              <div id="users">
                {(activeUsers || []).map((user) => (
                  <p key={user.id}>{user.username}</p>
                ))}
              </div>
            </div>
            <div className={classes.ChatMessage}>
              {(roomMessage || []).map((message) => (
                <div ref={divRref} key={Math.random()} className={classes.Message}>
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
          </div> */}
        </div>
      )}
    </>
  );
};

export default Chat;
