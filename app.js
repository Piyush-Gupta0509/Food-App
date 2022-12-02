const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { db_link } = require("./secrets");
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

async function getUser(req, res) {
  //console.log(req.query);
  //let { name, age } = req.query;
  // let filteredData=user.filter(userObj => {
  //     return (userObj.name==name && userObj.age==age)
  // })
  // res.send(filteredData);
  // res.send(user);

  //get all users from db
  let allUsers = await userModel.find();

  res.json({ msg: "users retrieved", allUsers });
  // console.log("getUser called ");
  // next();
}

async function postUser(req, res) {
  // console.log(req.body.Name);
  // //then i can put this in db
  // user.push(req.body);
  // res.json({
  //   message: "Data received successfully",
  //   user: req.body,
  // });

  try {
    let data = req.body;
    let user = await userModel.create(data);
    console.log(data);
    res.json({
      msg: "user signed up",
      user,
    });
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
}

async function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  // for (key in dataToBeUpdated) {
  //   user[key] = dataToBeUpdated[key];
  // }
  let doc = await userModel.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    message: "data updated succesfully",
  });
}

async function deleteUser(req, res) {
  // user = {};
  let doc = await userModel.deleteOne({ email: "@gmail.com" });
  console.log(doc);
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

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 7,
  },
});

userSchema.pre("save", function () {
  console.log("before saving in db");
});

userSchema.post("save", function () {
  console.log("after saving in db");
});
//models
const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
//   let user = {
//     name: "Piyush",
//     email: "abc@gmail.com",
//     password: "12345678",
//     confirmPassword: "12345678",
//   };
//   let data = await userModel.create(user);
//   console.log(data);
// })();
