const express = require("express");
const router = express.Router();

const db = require("./db");
var errormsg = null;

router.get("/page", async (req, res) => {
  res.render("login",{errormsg});
});

router.post("/", async (req, res) => {
  var username = req.body.username;
  var passwd = req.body.passwd;
  var userSearch =
    "select passwd from Users where username ='" + username + "'";
  await db.query(userSearch, async (error, rows) => {
    if (!!error) {
      res.redirect("/login/page");
    }
    if (rows.length == 0) {
      errormsg = "Incorrect usernmae or pasword";
      res.redirect("/login/page");
    } else if (rows.length == 1) {
      if (rows[0].passwd == passwd) {
        console.log("Successfull login : " + username);
        req.session.uname = username;
        console.log(req.session.uid)
        res.redirect("/");
      } else {
        console.log("Incorrect usernmae or pasword");
        errormsg = "Incorrect usernmae or pasword";
        res.redirect("/login/page");
      }
    }
  });
});

module.exports = router;
