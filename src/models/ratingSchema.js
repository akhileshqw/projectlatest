import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
  vendorName: {
    type: String,
  },
  vendorEmail: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  givenby: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const RatingModal = mongoose.model("rating", ratingSchema);
