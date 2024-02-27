const db = require("../components/connect");
const bcrypt = require("bcryptjs");
const sessions = require('express-session');
// //SESSIONS 
// const oneDay = 1000 * 60 * 60 * 24

// app.use(sessions({
//   secret: "thisismysecretkey",
//   saveUninitialized: true,
//   cookie: { maxAge: oneDay },
//   resave: false
// }));

// app.use(parser());
let session;

exports.authenticate = async (req, res) => {
  
  const {email, password} = req.body;
  

  db.query(`SELECT * FROM users u WHERE u.email = ?`, [email], async (error, results) => {
  
  if (error) throw (error)

  if (results.length == 0) {
    res.render('login', {error: "Invalid username and/or password"});
    res.sendStatus(404);
  } else {
    const hashedPassword = results[0].password;

    if (await bcrypt.compare(password, hashedPassword)) {
      session = req.session;
      session.user = email; //set session identifier
      res.render("dashboard/index"); // path relative to views folder
    } else {
        res.render('login', {error: "Invalid username and/or password"});
    }
  }
  
  });
}
