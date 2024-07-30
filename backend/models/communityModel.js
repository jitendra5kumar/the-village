const { Schema, model } = require("mongoose");

const communitySchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    image: {
      // Changed 'images' to 'image' and updated the type to String
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("community", communitySchema);
