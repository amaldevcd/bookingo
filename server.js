const express = require("express");
const path = require("path");
const connection = require("./db");
const db = require("./db");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuid4 } = require("uuid");

const server = express.Router();

const shows = require("./shows");
const theater = require("./theater");
const book = require("./book");
const ticket = require("./ticket");
const pay = require("./pay");
const login = require("./login");
const signup = require("./signup");
const list = require("./list");

const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: uuid4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/theater", theater);
app.use("/shows", shows);
app.use("/book", book);
app.use("/ticket", ticket);
app.use("/pay", pay);
app.use("/login", login);
app.use("/signup", signup);
app.use("/list", list);

app.get("/", async (req, res) => {
  console.log(req.session.user);
  var movieSearch = "select * from Movie";
  await connection.query(movieSearch, async function (error, result, rows) {
    if (!!error) console.log(error);
    else {
      if (req.session.uname) {
        res.render("dashboard", {
          title: "Home",
          result,
          user: req.session.uname,
        });
      } else {
        res.render("dashboard", { title: "Home", result });
      }
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send;
    } else res.redirect("/");
  });
});

app.listen(3030, () => {
  console.log("Server is starting..");
});

module.exports = server;
