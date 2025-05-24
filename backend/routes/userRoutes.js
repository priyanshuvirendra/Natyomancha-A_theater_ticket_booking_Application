import express from "express";
import {
  changeUserPassword,
  deleteUser,
  deleteUserProfile,
  getAllUsers,
  getLoggedInUserDetails,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updatedUserProfile,
  verifyCode,
} from "../controllers/userCtrl.js";
import { admin, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", requestPasswordReset);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);

// ***************** PRIVATE ROUTES ***********************
router.get("/userdetails", authenticate, getLoggedInUserDetails);
router.put("/", authenticate, updatedUserProfile);
router.delete("/", authenticate, deleteUserProfile);
router.put("/password", authenticate, changeUserPassword);
// router.get("/favourites", authenticate, getAllFavoriteMovies);
// router.post("/favourites", authenticate, toggleAddToFavoriteMovies);
// router.delete("/favourites", authenticate, deleteAllFavoriteMovies);
// router.post("/buy-subscription", authenticate, buySubscription);
// router.post("/cancel-subscription", authenticate, cancelSubscription);

// ***************** ADMIN ROUTES ***********************
router.get("/", getAllUsers);
router.delete("/:id", authenticate, admin, deleteUser);

export default router;
