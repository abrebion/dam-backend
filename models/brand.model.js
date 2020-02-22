const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Orangina", "Schweppes", "Oasis", "Oasis O'Verger", "MayTea", "Pulco", "Champomy", "Gini", "Canada Dry", "Pampryl", "Ricqlès", "Brut de Pomme", "Banga"],
      trim: true
    }
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", schema);

module.exports = Brand;
