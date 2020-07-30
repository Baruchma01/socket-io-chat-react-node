const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
//Get user name and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Get message from the server
socket.on("message", (message) => {
  outputMessage(message);

  //Scroll after message
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

//Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Value of message
  const msg = e.target.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);

  e.target.msg.value = "";
  e.target.msg.focus();
});

// Output message to DOM

const outputMessage = (message) => {
  console.log(message);
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;

  document.querySelector(".chat-messages").appendChild(div);
};

// Add room name to DOM

const outputRoomName = (room) => {
  roomName.innerHTML = room;
};

// Add users to DOM

const outputUsers = (users) => {
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}
