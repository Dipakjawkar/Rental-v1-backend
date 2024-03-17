const express = require("express")
const {signout, signup, signin} = require("../controller/userController")
const user = express.Router();

user.post("/signin",signin)
user.post("/signup",signup)
user.get("/signout",signout)

module.exports = user


