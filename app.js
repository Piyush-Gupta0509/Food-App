const express = require("express");
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter')
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(3000);
