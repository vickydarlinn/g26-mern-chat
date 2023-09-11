const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authenticationRoute = require("./routes/authenticationRouter");
const chatRoute = require("./routes/chatRouter");
const userRoute = require("./routes/userRouter");
const db = require("./utils/db");

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5555;

db();

app.use("/api/v1/auth", authenticationRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
