import mongoose from "mongoose";

const showCineastSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cineast",
    required: true,
  },
  role: {
    type: String,
  },
});

const showSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    ticketPrice: {
      frontStall: {
        type: Number,
        required: true,
      },
      rearStall: {
        type: Number,
        required: true,
      },
      balcony: {
        type: Number,
        required: true,
      },
    },
    // totalSeats: {
    //     type: Number,
    //     required: true,
    // },
    bookedSeats: {
      type: Array,
      default: [],
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
    casts: [showCineastSchema],
    crews: [showCineastSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Show", showSchema);
