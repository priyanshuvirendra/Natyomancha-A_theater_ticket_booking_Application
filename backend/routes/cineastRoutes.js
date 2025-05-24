import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createCineast,
    deleteCineast,
    getAllCineasts,
    updateCineast,
} from "../controllers/cineastCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getAllCineasts);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createCineast);
router.put("/:id", authenticate, admin, updateCineast);
router.delete("/:id", authenticate, admin, deleteCineast);

export default router;
