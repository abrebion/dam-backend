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
      enum: ["Product Image", "Logo", "Presentation", "Brand Guideline", "Font"],
      required: true
    },
    public_url: {
      type: String,
      //   required: true,
      unique: true,
      trim: true
    },
    meta_ean13: {
      type: String,
      unique: true,
      match: [/\d{13}/, "EAN code is not valid"],
      required: [requiredFieldForProductImage, "EAN13 code is required for product image"]
    },
    meta_brand: {
      type: String,
      required: true,
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
      required: true,
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
      required: [requiredFieldForProductImage, "Capacity (ex: 1.5l) is required for product image"]
    },
    meta_format: {
      type: String,
      enum: ["Standard", "Lot Gratuité", "Lot Standard"],
      required: [requiredFieldForProductImage, "Format (ex: Standard, Lot Gratuité) is required for product image"]
    },
    meta_tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    meta_file_format: {
      type: String // ex: .jpg, .png, .psd, .eps and more
    },
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

const Asset = mongoose.model("Asset", schema);

module.exports = Asset;
