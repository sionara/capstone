const express = require("express");
const path = require("path");

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

//PAGE ROUTES
const router = require("./routes/pages");
const authRouter = require("./routes/auth");
app.use("/", router);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started in ${port}`);
})