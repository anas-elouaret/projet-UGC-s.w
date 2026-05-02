const Service = require("../models/Service");

const listServices = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = { status: "public" };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    const services = await Service.find(filter)
      .sort({ createdAt: -1 })
      .populate("owner", "name email role");

    res.json({ success: true, count: services.length, services });
  } catch (error) {
    console.error("Service list error:", error);
    res.status(500).json({ success: false, message: "Could not load services" });
  }
};

const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "owner",
      "name email role",
    );

    if (!service || (service.status !== "public" && (!req.user || !service.owner._id.equals(req.user._id)))) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, service });
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({ success: false, message: "Error fetching service" });
  }
};

const createService = async (req, res) => {
  const { title, description, category, price, deliveryTime, tags, image, status } = req.body;

  if (!title || !description || price == null) {
    return res.status(400).json({ success: false, message: "Title, description and price are required" });
  }

  try {
    const service = await Service.create({
      title: title.trim(),
      description: description.trim(),
      category: category?.trim() || "Digital Service",
      price: Number(price),
      deliveryTime: deliveryTime?.trim() || "7 days",
      tags: Array.isArray(tags) ? tags.map((tag) => tag.trim()) : [],
      image: image || "",
      owner: req.user._id,
      status: status === "draft" ? "draft" : "public",
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ success: false, message: "Failed to create service" });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    if (!service.owner.equals(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    Object.assign(service, {
      title: req.body.title?.trim() ?? service.title,
      description: req.body.description?.trim() ?? service.description,
      category: req.body.category?.trim() ?? service.category,
      price: req.body.price != null ? Number(req.body.price) : service.price,
      deliveryTime: req.body.deliveryTime?.trim() ?? service.deliveryTime,
      tags: Array.isArray(req.body.tags) ? req.body.tags.map((tag) => tag.trim()) : service.tags,
      image: req.body.image ?? service.image,
      status: req.body.status === "draft" ? "draft" : service.status,
    });

    await service.save();
    res.json({ success: true, service });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ success: false, message: "Could not update service" });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    if (!service.owner.equals(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await service.deleteOne();
    res.json({ success: true, message: "Service removed" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ success: false, message: "Could not remove service" });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ owner: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, count: services.length, services });
  } catch (error) {
    console.error("My services error:", error);
    res.status(500).json({ success: false, message: "Could not fetch your services" });
  }
};

module.exports = {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
  getMyServices,
};
