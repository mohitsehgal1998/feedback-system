import TeamRepositoryContract from "../contracts/team-repository";
import Feedbacks from "../models/Feedbacks";
import TeamMembers from "../models/TeamMembers";
class TeamRepository implements TeamRepositoryContract {
  async updateFeedbackStatus(request: { feedback_id: any; status: any }) {
    try {
      const { feedback_id, status } = request;

      // Validate input
      if (!feedback_id || !status) {
        throw new Error("Feedback ID and status are required.");
      }

      // Valid statuses
      const validStatuses = ["resolved", "in progress", "pending"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status provided.");
      }

      // Find the feedback entry
      const feedback = await Feedbacks.findById(feedback_id);
      if (!feedback) {
        throw new Error("Feedback not found.");
      }

      // Update the status
      feedback.status = status;
      await feedback.save();

      return {
        success: true,
        message: "Feedback status updated successfully",
        data: {
          _id: feedback._id,
          name: feedback.name,
          status: feedback.status,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error updating feedback status.");
    }
  }

  async listFeedback(request: { team_id: any }) {
    try {
      const { team_id } = request;

      // Validate input
      if (!team_id) {
        throw new Error("Team ID is required.");
      }

      // Fetch feedbacks related to the team's members
      const feedbacks = await Feedbacks.find({
        team_id: team_id,
      });

      if (feedbacks.length == 0) {
        return {
          success: true,
          message: "No feedbacks found",
          data: feedbacks,
        };
      }

      return {
        success: true,
        message: "Feedbacks retrieved successfully.",
        data: feedbacks,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching feedbacks.");
    }
  }
}

export default new TeamRepository();
