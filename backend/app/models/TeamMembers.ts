import mongoose from "mongoose";

// Member sub-schema
const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams", // Refers to the Teams model
    required: true,
  },
});

export default mongoose.models.TeamMembers || mongoose.model("TeamsMembers", TeamMemberSchema);