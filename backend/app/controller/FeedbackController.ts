import UserRepository from "../repositories/user-repository.ts";

class FeedbackController {
  // userRepository: any;
  // constructor() {
  //   this.userRepository = new UserRepository();
  // }

  async submitFeedback(req: any, res: any) {
    try {
      const feedbackResponse = await UserRepository.submitFeedback(req.body);
      return res.status(200).json(feedbackResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new FeedbackController();