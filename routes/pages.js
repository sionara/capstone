const express = require("express");
const router = express.Router();
let session;

//home page
router.get("/", (req, res) => {
  session=req.session;
  console.log(session);
  if(session.user) { // accesses and checks there is a sessionid in store
    res.render("dashboard/index");
  } 
  res.render("index", {title: "Home"});
});

router.get("/login", (req, res) => {
  res.render("login", {title: "Login"});
});

router.get("/register", (req, res) => {
  res.render("register", {title: "Register"});
});

router.get("/registrationSuccess", (req, res) => {
  res.render("registrationSuccess");
});



module.exports = router;