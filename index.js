import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import { connectDb } from "./lib/db.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const port = process.env.PORT || 5000;

const swaggerDocument = YAML.load("./swagger.yaml"); 

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
  connectDb();
});
