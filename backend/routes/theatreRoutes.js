import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createTheatre,
    deleteTheatre,
    getAllTheatres,
    updateTheatre,
} from "../controllers/theatreCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getAllTheatres);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createTheatre);
router.put("/:id", authenticate, admin, updateTheatre);
router.delete("/:id", authenticate, admin, deleteTheatre);

export default router;
