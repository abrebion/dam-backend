require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index.route");
const usersRouter = require("./routes/users.route");
const assetsRouter = require("./routes/assets.route");
const tagsRouter = require("./routes/tags.route");
const collectionsRouter = require("./routes/collections.route");

// Will probably not be used
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

const app = express();

// Configure CORS for frontend server
const corsOptions = {
  origin: process.env.FRONTEND_URI
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());

// Will probably not be used
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));

// Index router
app.use("/", indexRouter);

// Users router
app.use("/users", usersRouter);

// Assets router
app.use("/assets", assetsRouter);

// Tags router
app.use("/tags", tagsRouter);

// Collections router
app.use("/collections", collectionsRouter);

module.exports = app;
