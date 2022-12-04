const express = require("express");
const authRouter = express.Router();
const userModel=require('../models/userModel')

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);


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
  
module.exports=authRouter;