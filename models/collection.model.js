const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Asset"
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", schema);

module.exports = Collection;
