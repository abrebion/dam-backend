const express = require("express");
const router = new express.Router();
const userModel = require("../models/user.model");
const passport = require("passport");
const bcryptjs = require("bcryptjs");

const minPasswordLength = 4;

router.post("/register", (req, res, next) => {
  // console.log(req.body);
  var errorMsg = "";
  const { email, password } = req.body;
  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email) errorMsg += "Provide email and password.\n";

  if (password.length < minPasswordLength) errorMsg += `Please make your password at least ${minPasswordLength} characters.`;

  if (errorMsg) return res.status(403).json(errorMsg); // 403	Forbidden

  const salt = bcryptjs.genSaltSync(10);
  // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
  const hashPass = bcryptjs.hashSync(password, salt);

  const newUser = {
    email,
    password: hashPass
  };
  console.log(">>>>>>>" + newUser);

  userModel
    .create(newUser)
    .then(newUserFromDB => {
      console.log("newly created user", newUserFromDB);
      res.status(200).json({ msg: "signup ok" });
    })
    .catch(err => {
      console.log("signup error", err);
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden

    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, function(err) {
      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.json({ message: "Something went wrong logging in" });
      }

      // We are now logged in
      // You may find usefull to send some other infos
      // dont send sensitive informations back to the client
      // let's choose the exposed user below
      const { _id, username, email, favorites, avatar, role } = user;
      // and only expose non-sensitive inofrmations to the client's state
      next(
        res.status(200).json({
          currentUser: {
            _id,
            email,
            firstname,
            lastname,
            role,
            status
          }
        })
      );
    });
  })(req, res, next); // IIFE (module) pattern here (see passport documentation)
});

router.post("/reset-password", (req, res, next) => {});

router.post("/logout", (req, res, next) => {
  req.logout(); // method provided by passport
  res.status(200).json("Successfully logged out");
});

router.use("/is-logged-in", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, email, firstname, lastname, role, status } = req.user;
    return res.status(200).json({
      currentUser: {
        _id,
        email,
        firstname,
        lastname,
        role,
        status
      }
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = router;
