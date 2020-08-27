import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import openSocket from "socket.io-client";
import Spinner from "../../components/Spinner/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = openSocket(process.env.REACT_APP_API_URI);
const Chat = ({ location }) => {
  const fullScreen = {
    chatContainer: {
      width: "100%",
      margin: "0 auto",
      height: "100vh",
    },
    inputArea: {
      marginTop: "auto",
    },
  };

  const divRref = useRef(null);
  const [msg, setMsg] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [roomMessage, setRoomMessage] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [error, setError] = useState({ error: false, msg: "", redirect: "" });

  const { username, room } = location.state.user;
  const siteSize = isFullScreen ? fullScreen : {};

  const notify = (msg) => {
    return toast(msg);
  };

  useEffect(() => {
    socket.on("exception", (error) => {
      console.log("XD");
      setError(() => ({ error: true, msg: error, redirect: false }));
      notify(error.errorMessage);
    });
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
  }, []);

  useEffect(() => {
    // Get message from the server
    socket.on("message", (message) => {
      setRoomMessage((state) => [...state, message]);
      divRref.current.scrollIntoView({ behavior: "smooth" });
    });
    // Get room and users
    socket.on("roomUsers", ({ room, users }) => {
      const usersWithColor = users.map((user) => {
        user.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        return user;
      });
      setActiveUsers((state) => usersWithColor);
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const specialColor = {
    color: "#79889d",
  };

  const liGray = {
    background: "#e4eaee",
  };

  return (
    <>
      {!socket.connected || error.error ? (
        <>
          <Spinner />
          <ToastContainer
            position="top-center"
            autoClose={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="ChangeNickName">
            <a href="/" className="BtnNickName">
              <button className='LogOutBtn'>Chane Nick Name</button>
            </a>
          </div>
        </>
      ) : (
        <div className="ChatContainer" style={siteSize.chatContainer}>
          <div className="ChatHeader">
            <div className="Dots">
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
            <div
              style={{ position: "relative", right: "5px", cursor: "pointer" }}
              onClick={toggleFullScreen}
            >
              <i className="fa fa-expand"></i>
            </div>
          </div>
          <div className="ChatSection">
            <div className="ConversationList">
              <ul>
                <div className="List">
                  <i style={specialColor} className="fa fa-list-alt fa-xs"></i>
                  <li>{currentRoom}</li>
                </div>
                <div className="List">
                  <i style={specialColor} className="fa fa-user fa-xs"></i>
                  <li>Team chat</li>
                </div>
                <div style={{ width: "100%" }}>
                  {(activeUsers || []).map((user) => (
                    <div className="List" key={user.id}>
                      <i
                        style={{ color: user.color }}
                        className="fa fa-circle-o online fa-xs"
                      ></i>
                      <li>{user.username}</li>
                    </div>
                  ))}
                </div>
              </ul>
              <div className="ButtomList">
                <a href="/" className="Btn">
                  <button>Leave</button>
                </a>
              </div>
            </div>

            <div className="ChatArea">
              <div className="Title">
                <span>Conversation title</span>
              </div>

              <div className="MsgContainer">
                <div className="singleMsg">
                  {(roomMessage || []).map((message, index) => {
                    return (
                      <ul
                        ref={divRref}
                        key={index}
                        style={liGray}
                        className="MessageArea"
                      >
                        <li className="MessageLi">
                          <div className="MsgName">
                            <span className="">{message.username}</span>
                          </div>
                          <div className="Msg">
                            <p>{message.text}</p>
                            <span className="msg-time">{message.time}</span>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>

              <form className="InputArea" style={siteSize.inputArea}>
                <div className="InputWrapper">
                  <input
                    type="text"
                    placeholder="Enter Message"
                    value={msg}
                    onChange={handleMsgChange}
                  />
                </div>

                <button className="BtnSubmit" onClick={submitMessageHandler}>
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
