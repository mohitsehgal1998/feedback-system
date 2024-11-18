import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "resolved", "in progress"],
    default: "pending",
    required: true,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams", // Reference to Teams collection
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Feedback ||
  mongoose.model("Feedbacks", FeedbackSchema);
