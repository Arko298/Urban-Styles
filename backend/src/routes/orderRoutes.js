import { Router } from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";
import {
  calculateTotalSales,
  calculateTotalSalesByDate,
  countTotalOrders,
  createOrder,
  findOrderById,
  getAllOrders,
  getUserOrders,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controllers/orderControllers.js";

const router = Router();

router
  .route("/")
  .post(authenticateToken, createOrder)
  .get(authenticateToken, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticateToken, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticateToken, findOrderById);
router.route("/:id/pay").put(authenticateToken, markOrderAsPaid);

// router.route("/:id/cancel").put(authenticateToken, markOrderAsDelivered);
router
  .route("/:id/deliver")
  .put(authenticateToken, authorizeAdmin, markOrderAsDelivered);

export default router;
