const socket = io();
const nickName = document.querySelector("#nickName");
const input = document.querySelector("#input");
const list = document.querySelector(".chatBox .list");
const sendBtn = document.querySelector(".inputBox .sendBtn");
const chatBox = document.querySelector(".chatBox");
let msg = "";
let name = "";

const chat = () => {
  msg = input.value;
  name = nickName.value;
  const item = {
    name: name,
    msg: msg,
  };
  socket.emit("kekeo", item);
};
input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (!e.shiftKey) {
      if (input.value === "") {
        e.preventDefault();
      } else {
        chat();
      }
    }
  }
});
sendBtn.addEventListener("click", () => {
  chat();
});
socket.on("kekeo", (data) => {
  const otherMe = nickName.value === data.name ? "me" : "other";
  list.insertAdjacentHTML(
    "beforeend",
    `
  <li class="${otherMe}">
          <div class="chat"><span>${data.msg}</span></div>
          <div class="infoBox">
            <span class="nick">${data.name}</span>
            <span class="time">${data.time}</span>
          </div>
        </li>`
  );
  input.value = "";
  chatBox.scrollTop = list.scrollHeight;
});
