import React, { useState, useEffect } from "react";
import './Join.css';
import { useHistory } from "react-router-dom";

const Join = () => {
  const history = new useHistory();
  const [joinFormField, setJoinFormField] = useState({
    username: "",
    room: "JavaScript",
  });

  const changeFormHandler = (e) => {
    setJoinFormField({
      ...joinFormField,
      [e.target.name]: e.target.value,
    });
  };

  const joinChatHandler = (e) => {
    e.preventDefault();
    if (joinFormField.username === "") {
      alert("אנא מלא את שדה השם");
    } else {
      history.push('/chat', {
        user: joinFormField
      });
    }
  };



  return (
    <div className='JoinContainer'>
      <header className='JoinHeader'>
        <h1>
          <i className="fas fa-comments"></i> DeveloperChat
        </h1>
      </header>
      <main className='JoinMain'>
        <form className='Form'>
          <div className='FormControl'>
            <label className='Label'>NickName</label>
            <input
              className='Input'
              type="text"
              name="username"
              id="username"
              placeholder="Enter nickname..."
              required
              value={joinFormField.userName}
              onChange={changeFormHandler}
            />
          </div>
          <div className='FormControl'>
            <label className='Label'>Choose Room</label>
            <select
              className='RoomSelect'
              name="room"
              id="room"
              value={joinFormField.room}
              onChange={changeFormHandler}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button className='JoinBtn' onClick={joinChatHandler}>Join Chat</button>
        </form>
      </main>
    </div>
  );
};

export default Join;
