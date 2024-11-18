import AdminRepositoryContract from "../contracts/admin-repository";
import Feedbacks from "../models/Feedbacks";
import Teams from "../models/Teams";

class AdminRepository implements AdminRepositoryContract {
  async getFeedbackList() {
    try {
      const feedbacks = await Feedbacks.find();

      if (!feedbacks || feedbacks.length === 0) {
        throw new Error("No feedbacks found");
      }

      return { success: true, data: feedbacks }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching feedbacks");
    }
  }

  async getTeams() {
    try {
      const teams = await Teams.find();
      if(!teams || teams.length === 0){
        throw new Error("No team found");
      }
      
      return { success: true, data: teams }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching teams");
    }
  }

  async assignFeedbackToTeam(request: { feedback_id: any; team_id: any; }) {
    try {
      const { feedback_id, team_id } = request;
      
      // Find the feedback by ID
      const feedback = await Feedbacks.findById(feedback_id);
      if (!feedback) {
        throw new Error("Feedback not found");
      }

      // Find the team by ID
      const team = await Teams.findById(team_id);
      if (!team) {
        throw new Error("Team not found");
      }

      // Assign the feedback to the team
      feedback.team_id = team_id;
      feedback.status = 'assigned';

      // Save the updated feedback
      await feedback.save();

      return { success: true, message: "Feedback assigned to the team successfully", data: feedback };
    } catch (error) {
      console.error(error);
      throw new Error("Error assigning feedback to team");
    }
  }
}

export default new AdminRepository();
