const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart items are required" });
    }

    if (typeof total !== "number" || total <= 0) {
      return res.status(400).json({ success: false, message: "Valid total is required" });
    }

    const providerId = items[0]?.providerId;
    const orderItems = items.map((item) => ({
      serviceId: item.id,
      title: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity || 1),
      providerId: item.providerId || providerId || null,
    }));

    const newOrder = await Order.create({
      items: orderItems,
      total,
      buyer: req.user._id,
      provider: providerId || null,
      status: "pending",
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

const getOrders = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "provider") {
      filter.provider = req.user._id;
    } else if (req.user.role === "client") {
      filter.buyer = req.user._id;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .populate("buyer", "name email")
      .populate("provider", "name email");

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ success: false, message: "Could not fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("buyer", "name email")
      .populate("provider", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isBuyer = order.buyer?._id.equals(req.user._id);
    const isProvider = order.provider?._id.equals(req.user._id);

    if (!isBuyer && !isProvider && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ success: false, message: "Could not fetch order" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isProvider = order.provider && order.provider.equals(req.user._id);
    if (!isProvider && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { status } = req.body;
    const allowed = ["pending", "in_progress", "delivered", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ success: false, message: "Could not update order status" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
