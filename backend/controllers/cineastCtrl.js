import Cineast from "../models/cineastModel.js";
import asyncHandler from "express-async-handler";

// ************************* PUBLIC CONTROLLERS *********************

// Get all Cineasts

export const getAllCineasts = asyncHandler(async (req, res) => {
    try {
        // find all cineasts in database
        const cineasts = await Cineast.find({});
        // send all cineasts to the client
        res.json(cineasts);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// ************************* ADMIN CONTROLLERS *********************

// Create new a cineast

export const createCineast = asyncHandler(async (req, res) => {
    try {
        // get the details from req.body
        const { name, image, details } = req.body;
        // create new cineast from the request body
        const cineast = new Cineast({
            name,
            image,
            details,
        });

        // save the cineast in database
        const createdcineast = await cineast.save();

        // send new cineast to the client
        res.status(201).json(createdcineast);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Update cineast infos

export const updateCineast = asyncHandler(async (req, res) => {
    // get the cineast from cineast id from request params
    const cineast = await Cineast.findById(req.params.id);

    if (cineast) {
        // update cineast details
        cineast.name = req.body.name || cineast.name;
        cineast.image = req.body.image || cineast.image;
        cineast.details = req.body.details || cineast.details;

        // save the updated cineast
        const updatedcineast = await cineast.save();
        // send the updated cineast to the client
        res.json(updatedcineast);
    } else {
        res.status(404);
        throw new Error("Cineast not found");
    }
});

// Delete a cineast

export const deleteCineast = asyncHandler(async (req, res) => {
    // get cineast id from request params
    const cineast = await Cineast.findById(req.params.id);

    if (cineast) {
        // delete the cineast from database
        await Cineast.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of cineast.remove() method
        // send success message to the client
        res.json({ message: "Cineast removed successfully" });
    } else {
        res.status(404);
        throw new Error("Cineast not found");
    }
});
