const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lasttname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email is already in use"],
      index: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // cf. https://emailregex.com/
        "A valid email format is required"
      ]
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "editor", "admin"],
      default: "user"
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "on hold", "blocked"],
      default: "on hold"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
