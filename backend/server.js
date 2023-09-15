const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authenticationRoute = require("./routes/authenticationRouter");
const chatRoute = require("./routes/chatRouter");
const userRoute = require("./routes/userRouter");
const messageRoute = require("./routes/messageRouter");
const db = require("./utils/db");
const { Socket } = require("socket.io");

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5555;

db();

app.use("/api/v1/auth", authenticationRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/messages", messageRoute);

const server = app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

const socketIo = require("socket.io")(server, {
  pingTimeout: 120000,
  cors: {
    origin: "*",
    credentials: true,
  },
});
socketIo.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("chatRoom", (room) => {
    socket.join(room);
    console.log("room joined " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved);
    socketIo.emit("new recieved message", newMessageRecieved);
  });
});
