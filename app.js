const express = require("express");
const path = require("path");
const parser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
const port = process.env.PORT || "3000";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SET UP A PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SESSIONS MUST COME BEFORE ROUTER OR MIDDLEWARE WILL NOT BE CALLED
const oneDay = 1000 * 60 * 60 * 24

app.use(sessions({
  secret: "thisismysecretkey",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use(parser());

var session;

//PAGE ROUTES
const router = require("./routes/pages");
app.use("/", router);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server started in ${port}`);
})