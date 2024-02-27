const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router.post("/user", loginController.authenticate);

//logout

router.get("/logout", (req,res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;