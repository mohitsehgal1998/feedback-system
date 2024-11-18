import AdminRepository from "../repositories/admin-repository";

class AssignFeedbackController {
  async assignFeedback(req: any, res: any) {
    try {
      const response = await AdminRepository.assignFeedbackToTeam(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new AssignFeedbackController();