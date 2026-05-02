const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
  getMyServices,
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/", listServices);
router.get("/me", authMiddleware, requireRole(["provider", "admin"]), getMyServices);
router.get("/:id", authMiddleware, getService);
router.post("/", authMiddleware, requireRole(["provider", "admin"]), createService);
router.patch("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
