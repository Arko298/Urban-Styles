import Router from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";
import {
  createCategory,
  readCategory,
  removeCategory,
  updateCategory,
  listCategory
} from "../controllers/categoryControllers.js";

const router = Router();

router.route("/").post(authenticateToken, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .delete(authenticateToken, authorizeAdmin, removeCategory);
router
  .route("/:categoryId")
  .put(authenticateToken, authorizeAdmin, updateCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);


export default router;
