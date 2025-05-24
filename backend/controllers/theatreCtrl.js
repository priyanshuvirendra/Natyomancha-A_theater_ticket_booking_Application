import Theatre from "../models/theatreModel.js";
import asyncHandler from "express-async-handler";

// ************************* PUBLIC CONTROLLERS *********************

// Get all theatres

export const getAllTheatres = asyncHandler(async (req, res) => {
    try {
        // find all theatres in database
        const theatres = await Theatre.find({});
        // send all theatres to the client
        res.json(theatres);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// ************************* ADMIN CONTROLLERS *********************

// Create new theatre

export const createTheatre = asyncHandler(async (req, res) => {
    try {
        // get the details from req.body
        const { name, address, phone, owner } = req.body;
        // create new theatre from the request body
        const theatre = new Theatre({
            name,
            address,
            phone,
            owner,
        });

        // save the theatre in database
        const createdtheatre = await theatre.save();

        // send new theatre to the client
        res.status(201).json(createdtheatre);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Update a theatre

export const updateTheatre = asyncHandler(async (req, res) => {
    // get the theatre from theatre id from request params
    const theatre = await Theatre.findById(req.params.id);

    if (theatre) {
        // update theatre details
        theatre.name = req.body.name || theatre.name;
        theatre.address = req.body.address || theatre.address;
        theatre.phone = req.body.phone || theatre.phone;
        theatre.owner = req.body.owner || theatre.owner;

        // save the updated theatre
        const updatedtheatre = await theatre.save();
        // send the updated theatre to the client
        res.status(200).json(updatedtheatre);
    } else {
        res.status(404);
        throw new Error("Theatre not found");
    }
});

// Delete a theatre

export const deleteTheatre = asyncHandler(async (req, res) => {
    // get theatre id from request params
    const theatre = await Theatre.findById(req.params.id);

    if (theatre) {
        // delete the theatre from database
        await theatre.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of theatre.remove() method
        // send success message to the client
        res.json({ message: "Theatre removed successfully" });
    } else {
        res.status(404);
        throw new Error("Theatre not found");
    }
});
