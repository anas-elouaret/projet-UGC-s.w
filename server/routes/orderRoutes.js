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

    // Transform items to standard format (handles both old & new cart structure)
    const transformedItems = items.map((item) => ({
      // Support both old format (name/price) and new format (serviceName/finalPrice)
      name: item.name || item.serviceName,
      price: item.price || item.finalPrice,
      serviceId: item.serviceId,
      basePrice: item.basePrice,
      category: item.category,
      selectedOptions: item.selectedChoicesData || item.selectedOptions || [],
      quantity: item.quantity || 1,
    }));

    // Create new order
    const newOrder = new Order({
      items: transformedItems,
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
      items: transformedItems.map((i) => `${i.name} ($${i.price})`),
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
    console.error("❌ Order creation error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
    });
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
