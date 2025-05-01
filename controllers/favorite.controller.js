import Favorite from "../models/Favorite.js";
import Product from "../models/Product.js";

export const getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const favorite = await Favorite.findOne({ user: req.user._id });

    if (!favorite || favorite.product.length === 0) {
      return res.status(200).json({
        products: [],
        currentPage: page,
        totalFavorites: 0,
        totalPages: 0,
      });
    }

    const totalFavorites = favorite.product.length;
    const paginatedProductIds = favorite.product.slice(skip, skip + limit);

    const products = await Product.find({ _id: { $in: paginatedProductIds } });

    res.status(200).json({
      products,
      currentPage: page,
      totalFavorites,
      totalPages: Math.ceil(totalFavorites / limit),
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    let favorite = await Favorite.findOne({ user: req.user._id });

    if (!favorite) {
      favorite = new Favorite({
        user: req.user._id,
        product: [productId],
      });
    } else {
      if (!favorite.product.includes(productId)) {
        favorite.product.push(productId);
      }
    }

    await favorite.save();
    res.status(200).json({ message: "Product added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeFavorite = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const favorite = await Favorite.findOne({ user: req.user._id });
  
      if (!favorite) {
        return res.status(404).json({ message: "No favorites found" });
      }
  
      favorite.product = favorite.product.filter(
        (id) => id.toString() !== productId
      );
  
      await favorite.save();
      res.status(200).json({ message: "Product removed from favorites" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  