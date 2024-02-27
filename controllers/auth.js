const db = require("../components/connect");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  console.log(req.body);

  // const name = req.body.name;
  // const email = req.body.email;
  // const pwd = req.body.password;
  // const confirmPwd = req.body.confirmPwd;

  const { name, email, password, confirmPwd } = req.body;
  
  db.query("SELECT email FROM users WHERE email = ?", 
  [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if ( results.length > 0) { 
      return res.render("register", {message: "That email is already in use"});
    } else if ( password !== confirmPwd ) {
      return res.render("register", {message: "Passwords do not match"});
    } 

  let hashedPwd = await bcrypt.hash(password, 8);
    
    db.query('INSERT INTO users SET ?', 
    { name: name, email: email, password: hashedPwd }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        return res.redirect("index");
      }
    })
  });
}