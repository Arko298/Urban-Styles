//This is actually the users routes for the users. This is the file where all the routes are defined.
import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logoutCurrentUser,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/userControllers.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";

const router = Router();

router
  .route("/")
  .post(createUser)
  .get(authenticateToken, authorizeAdmin, getAllUsers); //if I am an admin only i will get the all users list other wise nah

router.post("/login", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticateToken, getCurrentUserProfile)
  .put(authenticateToken, updateCurrentUserProfile);//all authenticate users will be able to update their profile or look in to their profile.

//for admins
router
  .route("/:id")
  .delete(authenticateToken, authorizeAdmin, deleteUserById)//only admin can delete a user
  .get(authenticateToken, authorizeAdmin, getUserById)//only admin can get a user
  .put(authenticateToken, authorizeAdmin, updateUserById);//only admin can update a user not the personal details but only the basic info. 

export default router;
