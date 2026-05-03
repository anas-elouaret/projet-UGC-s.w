const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      // Support both old and new cart formats
      name: String,
      price: mongoose.Schema.Types.Mixed,
      quantity: { type: Number, default: 1 },
      
      // New cart format fields
      serviceId: String,
      basePrice: mongoose.Schema.Types.Mixed,
      category: String,
      selectedOptions: [
        {
          id: String,
          label: String,
          price: Number,
          optionId: String,
          type: String, // "radio" or "checkbox"
        },
      ],
    },
  ],
  total: mongoose.Schema.Types.Mixed,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
