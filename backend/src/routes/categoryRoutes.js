import Router from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddlewares";
import {
  createCategory,
  readCategory,
} from "../controllers/categoryControllers";

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
