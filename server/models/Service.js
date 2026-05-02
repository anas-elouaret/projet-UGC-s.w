const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Digital Service",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryTime: {
      type: String,
      default: "7 days",
      trim: true,
    },
    tags: [String],
    image: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["public", "draft"],
      default: "public",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Service", serviceSchema);
