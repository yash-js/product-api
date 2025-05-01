import express from "express";
import {
  create,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.js";
import {
  validateCreateProduct,
  validateDeleteProduct,
  validateUpdateProduct,
} from "../middleware/validation.js";


const router = express.Router();

router.post("/", protectRoute, validateCreateProduct, create);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", protectRoute, validateUpdateProduct, updateProduct);

router.delete("/:id", protectRoute, validateDeleteProduct, deleteProduct);

export default router;
