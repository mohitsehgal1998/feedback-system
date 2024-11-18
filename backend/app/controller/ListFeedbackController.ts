import TeamRepository from "../repositories/team-repository";

class ListFeedbackController {
  async listFeedback(req, res) {
    try {
      const response = await TeamRepository.listFeedback(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ListFeedbackController();