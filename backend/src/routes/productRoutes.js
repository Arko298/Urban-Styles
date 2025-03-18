import { Router } from "express";
import formidable from "express-formidable";
import {
  addProducts,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productControllers.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";
import checkId from "../middlewares/checkId.js";

const router = Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticateToken, authorizeAdmin, formidable(), addProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticateToken, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticateToken, authorizeAdmin, removeProduct);

router.route("/:id/reviews").post(authenticateToken, checkId, addProductReview);

router.route("/new").get(fetchNewProducts);
router.get("/top-products", fetchTopProducts);
router.route('/all-products').get(fetchAllProducts);

router.route("/filtered-products").post(filterProducts);


export default router;
