const passport = require("passport");
const bcryptjs = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");

passport.serializeUser((user, done) => {
  // console.log("serializeUser", user);
  done(null, user._id);
  // The user._id is written in session.
  // req.session.passport.user = {_id: '..'}
  // Used later as "id" while getting the full object @ deserializeUser("id", done)
});

passport.deserializeUser((id, done) => {
  // This middleware adds user object to req.user
  // console.log("deserializeUser", id);
  userModel
    .findById(id)
    .then(user => {
      // console.log("ok : passport.deserializeUser, user found in db ", user);
      done(null, user);
    })
    .catch(err => {
      // console.log("error: passport.deserializeUser, user NOT fetched from db ");
      done(err, null);
    });
});

// This function setup a local strategy and provides logic for login action
passport.use(
  new localStrategy(
    { usernameField: "email" }, // Change default username credential to email
    function(email, password, next) {
      // console.log("local strategy", email, passwd);
      userModel
        .findOne({ email: email })
        .then(user => {
          // console.log("@ LocalStrategy :::: found user in db :", user);
          if (!user) return next(null, false, "Incorrect login info");
          if (!bcryptjs.compareSync(password, user.password)) {
            // Password is not valid
            return next(null, false, "Incorrect login info");
          } else next(null, user); // It's all good!
        })
        .catch(error => next(error, null)); // Database query failed
    }
  )
);
