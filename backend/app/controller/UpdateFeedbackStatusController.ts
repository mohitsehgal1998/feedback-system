import TeamRepository from "../repositories/team-repository";

class UpdateFeedbackController {
  async updadeFeedback(req: any, res: any) {
    try {
      const response = await TeamRepository.updateFeedbackStatus(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new UpdateFeedbackController();