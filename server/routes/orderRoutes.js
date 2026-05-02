const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { items, total, createdAt } = req.body;

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // Create new order
    const newOrder = new Order({
      items,
      total,
      status: "pending",
      createdAt: createdAt || new Date(),
    });

    // Save to database
    const savedOrder = await newOrder.save();

    // Log order (for demo purposes)
    console.log("✓ New Order Created:");
    console.log({
      orderId: savedOrder._id,
      items: items.map((i) => `${i.name} ($${i.price})`),
      total: `$${total}`,
      timestamp: new Date().toISOString(),
    });

    // Send notification (email-ready structure)
    const notification = {
      type: "order_confirmation",
      orderId: savedOrder._id,
      customerEmail: "customer@example.com", // In real app, get from auth
      items,
      total,
      message: `Thank you for your order! Order #${savedOrder._id} has been received and is being processed.`,
    };

    console.log("📧 Notification Ready:", notification);

    // Return success response
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder._id,
      total,
      itemCount: items.length,
      notification,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
});

// Get all orders (admin only - optional)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

// Get single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order" });
  }
});

module.exports = router;
