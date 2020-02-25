require("dotenv").config();
require("./config/dbConnect");
require("./config/passport");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const logger = require("morgan");
const authenticationRouter = require("./routes/authentication.route");
const usersRouter = require("./routes/users.route");
const assetsRouter = require("./routes/assets.route");
const tagsRouter = require("./routes/tags.route");
const collectionsRouter = require("./routes/collections.route");

// Will probably not be used
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const hbs = require("hbs");

const app = express();

app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

// Passport initialization: MUST set be after session setup
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS for frontend server
const corsOptions = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Will probably not be used
// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.set("view engine", "hbs");
// app.set("views", __dirname + "/views");
// hbs.registerPartials(__dirname + "/views/partials");
// app.use(express.static(path.join(__dirname, "public")));

// Development mode to avoid being kicked out when server restart
// Force current user to a specific user from the database
const _DEVMODE = false;
if (_DEVMODE === true) {
  app.use(async (req, res, next) => {
    const userModel = require("./models/user.model");
    try {
      const user = await userModel.findOne({ email: "louise.brebion@suntory.com" });
      req.user = user;
      // console.log(req.user);
      next();
    } catch (error) {
      next(error);
    }
  });
}

// Index route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Authentication router
app.use(authenticationRouter);

// Users router
app.use("/users", usersRouter);

// Assets router
app.use("/assets", assetsRouter);

// Tags router
app.use("/tags", tagsRouter);

// Collections router
app.use("/collections", collectionsRouter);

module.exports = app;
