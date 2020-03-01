const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["Product Image", "Logo", "Presentation", "Brand Guideline", "Font", "Video"],
      required: true
    },
    public_id: {
      type: String
      // required: true,
      // unique: true
    },
    secure_url: {
      type: String,
      default: "default.jpg"
    },
    secure_url_preview: {
      type: String,
      default: "default.jpg"
    },
    meta_file_width: {
      type: Number
    },
    meta_file_height: {
      type: Number
    },
    meta_file_extension: {
      // ex: jpg, png, psd, eps and more
      type: String
    },
    meta_file_bytes: {
      // ex: 350749 = 342Kb
      type: Number
    },
    meta_ean13: {
      type: String,
      match: [/^\d{13}$/, "EAN code is not valid"],
      required: [requiredFieldForProductImage, "EAN13 code is required for product image"]
    },
    meta_brand: {
      type: String,
      enum: ["Orangina", "Schweppes", "Oasis", "Oasis O'Verger", "MayTea", "Pulco", "Champomy", "Gini", "Canada Dry", "Pampryl", "Ricqlès", "Brut de Pomme", "Banga"],
      required: [requiredFieldForProductImage, "Brand is required for product image"]
    },
    // meta_brand: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Brand"
    // },
    meta_recipe: {
      // Ex: Schweppes Zero
      type: String,
      required: [requiredFieldForProductImage, "Recipe is required for product image"]
    },
    meta_flavour: {
      // Ex: Schweppes Lemon Zero
      type: String,
      required: [requiredFieldForProductImage, "Flavour is required for product image"]
    },
    meta_packaging: {
      type: String,
      enum: ["PET", "CAN", "VERRE"],
      required: [requiredFieldForProductImage, "Packaging (ex: PET, CAN) is required for product image"]
    },
    meta_capacity: {
      // Ex: 1.5l, 2l, 33cl, 25cl
      type: String,
      enum: ["15cl", "25cl", "33cl", "50cl", "1l", "1.5l", "2l"],
      required: [requiredFieldForProductImage, "Capacity (ex: 1.5l) is required for product image"]
    },
    meta_format: {
      type: String,
      enum: ["Standard", "Lot Gratuité", "Lot Physique"],
      required: [requiredFieldForProductImage, "Format (ex: Standard, Lot Gratuité) is required for product image"]
    },
    meta_tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    marketing_description_1: {
      type: String,
      maxlength: 200
    },
    marketing_description_2: {
      type: String,
      maxlength: 200
    },
    marketing_description_3: {
      type: String,
      maxlength: 200
    },
    marketing_description_4: {
      type: String,
      maxlength: 200
    },
    marketing_description_5: {
      type: String,
      maxlength: 200
    },
    warehouse_availability_date: {
      type: Date
    }
    // metadata: {
    //   // cf. http://learnmongodbthehardway.com/schema/metadata/
    //   // Array of objects like {"key": "Camera make", "value": "Canon"}
    //   // for index and query performance
    //   type: []
    // },
  },
  { timestamps: true }
);

// Required function for related Product Image type assets
function requiredFieldForProductImage() {
  return this.type === "Product Image";
}

// schema.pre("findOneAndDelete", { query: true, document: false }, function(next) {
//   console.log("Document has been removed");
//   this.model("Collection").updateMany({ assets: { $in: this._id } }, { $pull: { assets: this._id } }, { multi: true }, next);
// });

const Asset = mongoose.model("Asset", schema);

module.exports = Asset;
