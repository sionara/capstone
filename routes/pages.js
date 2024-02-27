const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {title: "Home"});
});

router.get("/login", (req, res) => {
  res.render("login", {title: "Login"});
});

router.get("/register", (req, res) => {
  res.render("register", {title: "Register"});
})

router.get("/registrationSuccess", (req, res) => {
  res.render("registrationSuccess");
})
module.exports = router;