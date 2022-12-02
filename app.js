const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { db_link } = require('./secrets');
app.use(express.json());
let user = [
  {
    id: 1,
    name: "Abhishek",
    age: 100,
  },
  {
    id: 2,
    name: "Rajat",
    age: 10,
  },
  {
    id: 3,
    name: "Sunjyot",
    age: 50,
  },
];

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:name").get(getUserById);

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

function getUser(req, res) {
  console.log(req.query);
  let { name, age } = req.query;
  // let filteredData=user.filter(userObj => {
  //     return (userObj.name==name && userObj.age==age)
  // })
  // res.send(filteredData);
  res.send(user);
}

function postUser(req, res) {
  console.log(req.body.Name);
  //then i can put this in db
  user.push(req.body);
  res.json({
    message: "Data received successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    user[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "data updated succesfully",
  });
}

function deleteUser(req, res) {
  user = {};
  res.json({
    msg: "user has been deleted",
  });
}

function getUserById(req, res) {
  console.log(req.params.name);
  //let {id}=req.params;
  // let user = db.findOne(id);
  res.json({ msg: "user id is ", obj: req.params });
}

//middleware intro
function middleware1(req, res, next) {
  console.log("inside middleware1");
  next();
}

function middleware2(req, res) {
  console.log("inside middleware2 req/res cycle end here");
  res.sendFile("/views/index.html", { root: __dirname });
}

function getSignUp(req, res, next) {
  console.log("inside getSignUp");
  next();
}

function postSignUp(req, res) {
  let obj = req.body;
  console.log("backend", obj);
  res.json({
    message: "user signed up",
    data: obj,
  });
}
app.listen(3000);

mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
        // console.log(db);
    })
    .catch(function (err) {
        console.log(err);
    });