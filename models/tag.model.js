const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"]
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", schema);

module.exports = Tag;
