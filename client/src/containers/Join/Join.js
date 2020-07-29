import React from "react";
import classes from './Join.css'

const Join = () => {
  return (
    <div className={classes.JoinContainer}>
      <header className={classes.JoinHeader}>
        <h1>
          <i className="fas fa-smile"></i> DeveloperChat
        </h1>
      </header>
      <main className={classes.JoinMain}>
        <form action="chat.html">
          <div className={classes.FormControl}>
            <label className={classes.Label} htmlFor="username">Username</label>
            <input className={classes.Input}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div className={classes.FormControl}>
            <label className={classes.Label} htmlFor="room">Room</label>
            <select className={classes.RoomSelect} name="room" id="room">
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button type="submit">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default Join;
