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
      res.status(200).json({ message: "Registration OK" });
    })
    .catch(err => {
      console.log("signup error", err);
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(200).json({ status: "error", message: "Invalid user data", err, user });
    // req.Login is a passport method: http://www.passportjs.org/docs/login/
    // When the login operation completes, user will be assigned to req.user
    req.logIn(user, function(err) {
      if (err) return res.json({ message: "Something went wrong" });
      // User is now logged in, expose only non sensitive infromation
      const { _id, firstname, lastname, email, role, status } = user;
      next(
        res.status(200).json({
          status: "success",
          user: {
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
  })(req, res, next); // IIFE
});

router.post("/logout", (req, res, next) => {
  req.logout(); // Method provided by passport
  res.status(200).json("Successfully logged out");
});

router.use("/is-logged-in", (req, res, next) => {
  if (req.isAuthenticated()) {
    // Method provided by passport
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
