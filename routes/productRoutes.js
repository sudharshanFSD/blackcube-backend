const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
  likeProduct,
  getLikedProducts,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
router.post("/", authMiddleware, upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/liked", authMiddleware, getLikedProducts);
router.get("/:productId", getSingleProduct);
router.put("/:productId", authMiddleware, upload.single("image"), editProduct);
router.delete("/:productId", authMiddleware, deleteProduct);
router.put("/:productId/like", authMiddleware, likeProduct);

module.exports = router;