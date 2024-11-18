import UserRepository from "../repositories/user-repository";

class GetProductController {
  async getProduct(req, res) {
    try {
      const feedbackResponse = await UserRepository.getProductsList();
      return res.status(200).json(feedbackResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new GetProductController();