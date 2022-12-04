const express = require("express");
const userModel=require('../models/userModel')
const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);
userRouter.route("/getcookies").get(getCookies);
userRouter.route("/:name").get(getUserById);
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

  function setCookies(req,res){
    // res.setHeader('Set-Cookies', 'isLoggedIn=true');
    res.cookie('isLoggedIn',false, {maxAge: 10000});
    res.cookie('password',123456, {secure: true});
    res.send('cookies has been set');
  }
  
  function getCookies(req,res){
    let cookies=req.cookies;
    console.log(cookies);
    res.send('cookies received');
  }

module.exports=userRouter;