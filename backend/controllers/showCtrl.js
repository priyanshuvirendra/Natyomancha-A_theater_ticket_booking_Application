import Show from "../models/showModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

// ************************* PUBLIC CONTROLLERS *********************

// Get all shows

export const getAllShows = asyncHandler(async (req, res) => {
  try {
    // find all shows in database
    const shows = await Show.find({}).populate("theatre");

    // send the shows to the client
    res.json(shows);
  } catch (error) {
    res.status(400);
    console.error(error);
    throw new Error(error.message);
  }
});

// Get show by slug

export const getShowBySlugId = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  // find show by slug in database
  const show = await Show.findOne({ slug: slug })
    .populate("theatre")
    .populate("casts.person")
    .populate("crews.person");
  // if the show is found, send it to the client
  if (show) {
    res.status(200).json(show);
  } else {
    res.status(404);
    throw new Error("Show not found");
  }
});

// ************************* ADMIN CONTROLLERS *********************

// Create new show

export const createShow = asyncHandler(async (req, res) => {
  try {
    // get the show details from req.body
    const {
      title,
      description,
      poster,
      language,
      date,
      time,
      ticketPrice,
      // totalSeats,
      theatre,
      casts,
      crews,
    } = req.body;

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
    };
    const slug = slugify(`${title}-${formatDate(date)}`, {
      remove: /[*+/~.()'"!:@]/g,
    }).toLowerCase();

    // create new show from the request body
    const show = new Show({
      userId: req.user._id,
      title,
      slug,
      description,
      poster,
      language,
      date,
      time,
      ticketPrice,
      // totalSeats,
      theatre,
      casts,
      crews,
    });

    // save the show in database
    const createdshow = await show.save();

    // send new show to the client
    res.status(201).json(createdshow);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update a Show

export const updateShow = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    poster,
    language,
    date,
    time,
    ticketPrice,
    // totalSeats,
    theatre,
    casts,
    crews,
  } = req.body;

  // get the show from show id from request params
  const show = await Show.findById(req.params.id);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
  };

  if (show) {
    let slug;
    if (title) {
      slug = slugify(
        `${title}-${date ? formatDate(date) : formatDate(show.date)}`,
        {
          remove: /[*+/~.()'"!:@]/g,
        }
      ).toLowerCase();
    }

    // update show details
    show.title = title || show.title;
    show.slug = slug || show.slug;
    show.description = description || show.description;
    show.poster = poster || show.poster;
    show.language = language || show.language;
    show.date = date || show.date;
    show.time = time || show.time;
    show.ticketPrice = ticketPrice || show.ticketPrice;
    // show.totalSeats = totalSeats || show.totalSeats;
    show.theatre = theatre || show.theatre;
    show.casts = casts || show.casts;
    show.crews = crews || show.crews;

    // save the updated show
    const updatedshow = await show.save();
    // send the updated show to the client
    res.json(updatedshow);
  } else {
    res.status(404);
    throw new Error("Show not found");
  }
});

// Delete a show

export const deleteShow = asyncHandler(async (req, res) => {
  // get show id from request params
  const show = await Show.findById(req.params.id);

  if (show) {
    // delete the show from database
    await show.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of show.remove() method
    // send success message to the client
    res.json({ message: "Show removed successfully" });
  } else {
    res.status(404).json({ message: "Show not found" });
  }
});

// Delete all shows

export const deleteAllShows = asyncHandler(async (req, res) => {
  try {
    // delete all shows
    await Show.deleteMany({});
    res.json({ message: "All shows removed" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
