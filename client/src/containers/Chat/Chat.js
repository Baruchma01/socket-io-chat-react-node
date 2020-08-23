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

  const greenDot = {
    color: "#82cf85",
  };

  const specialColor = {
    color: "#79889d",
  };

  const liGray = {
    background: "#e4eaee",
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
              <i className="fa fa-expand"></i>
            </div>
          </div>
          <div className={classes.ChatSection}>
            <div className={classes.ConversationList}>
              <ul>
                <div className={classes.List}>
                  <i style={specialColor} className="fa fa-list-alt fa-xs"></i>
                  <li>{currentRoom}</li>
                </div>
                <div className={classes.List}>
                  <i style={specialColor} className="fa fa-user fa-xs"></i>
                  <li>Team chat</li>
                </div>
                <div style={{ width: "100%" }}>
                  {(activeUsers || []).map((user) => (
                    <div className={classes.List} key={user.id}>
                      <i
                        style={greenDot}
                        className="fa fa-circle-o online fa-xs"
                      ></i>
                      <li>{user.username}</li>
                    </div>
                  ))}
                </div>
              </ul>
              <div className={classes.ButtomList}>
                <a href="/" className={classes.Btn}>
                  <button>Leave</button>
                </a>
              </div>
            </div>

            <div className={classes.ChatArea}>
              <div className={classes.Title}>
                <span>Conversation title</span>
              </div>

              <div className={classes.MsgContainer}>
                <div className={classes.singleMsg}>
                  {(roomMessage || []).map((message, index) => {
                    return (
                      <ul
                        key={index}
                        style={liGray}
                        className={classes.MessageArea}
                      >
                        <li className={classes.MessageLi}>
                          <div className={classes.MsgName}>
                            <span className="">{message.username}</span>
                          </div>
                          <div className={classes.Msg}>
                            <p>{message.text}</p>
                            <span className="msg-time">{message.time}</span>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>

              <form className={classes.InputArea}>
                <div className={classes.InputWrapper}>
                  <input
                    type="text"
                    placeholder="Enter Message"
                    value={msg}
                    onChange={handleMsgChange}
                  />
                </div>

                <button
                  className={classes.BtnSubmit}
                  onClick={submitMessageHandler}
                >
                  {" "}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
