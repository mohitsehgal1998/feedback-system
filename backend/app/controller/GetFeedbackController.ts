import AdminRepository from "../repositories/admin-repository";

class GetFeedbackController {
  async getFeedback(req, res) {
    try {
      const feedbackResponse = await AdminRepository.getFeedbackList();
      return res.status(200).json(feedbackResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new GetFeedbackController();