const express = require("express");
const authRouter = express.Router();
const userModel=require('../models/userModel')

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter
  .route("/login")
  .post(loginUser)

  async function loginUser(req,res){
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email: email})
        if(user){
            // check if password matches
            // bcrypt should be done to make it more safe
            if(password==user.password){
                res.json({
                    msg:"user loggedIn "
                })
            }else{
                res.json({
                    msg:"Wrong Crendentials"
                })
            }

        }else{
        res.json({
            msg:"user not found"
        })
        }
    }catch{
        res.json({
            msg:err.message
        })
    }
    
  }

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