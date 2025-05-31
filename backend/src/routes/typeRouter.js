import { Router } from "express";
import { authenticateToken,authorizeAdmin } from "../middlewares/authMiddlewares.js";
import { updateType,readType,
    listType,
    removeType,
createTypes } from "../controllers/typeControllers.js";

const router = Router();

router.route("/").post(authenticateToken, authorizeAdmin, createTypes);
router
  .route("/:typeId")
  .delete(authenticateToken, authorizeAdmin, removeType);
router
  .route("/:typeId")
  .put(authenticateToken, authorizeAdmin, updateType);
router.route("/types").get(listType);
router.route("/:id").get(readType);


export default router;