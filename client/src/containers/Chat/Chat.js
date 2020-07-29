import React from "react";
import classes from './Chat.css'

const Chat = ({ location }) => {
  const { username, room } = location.state.user;

  return (
    <div className={classes.ChatContainer}>
      <header className={classes.ChatHeader}>
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <a className={classes.Btn}>
          Leave Room
        </a>
      </header>
      <main className={classes.ChatMain}>
        <div className={classes.ChatSideBar}>
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">JavaScript</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
              <li>
                  Baruch
              </li>
          </ul>
        </div>
        <div className={classes.ChatMessage}>
          <div className={classes.Message}>
            <p className={classes.Meta}>
              UserName <span>12:30PM</span>
            </p>
            <p className="text">Hello World</p>
          </div>
        </div>
      </main>
      <div className={classes.ChatFormContainer}>
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
          />
          <button className={classes.Btn} onClick={(e) => e.preventDefault()}>
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
