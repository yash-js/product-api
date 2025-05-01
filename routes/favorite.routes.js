import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { protectRoute } from "../middleware/auth.js";
import { validateAddToFavorites, validateRemoveFromFavorites } from "../middleware/validation.js";

const router = express.Router();

router.get("/", protectRoute, getFavorites);
router.post("/:productId", protectRoute, validateAddToFavorites, addFavorite);
router.delete(
  "/:productId",
  protectRoute,
  validateRemoveFromFavorites,
  removeFavorite
);

export default router;
