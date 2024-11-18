import mongoose from "mongoose";

// Team schema
const TeamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamsMembers", // Refers to the TeamsMembers model
    },
  ]
});

export default mongoose.models.Teams || mongoose.model("Teams", TeamSchema);