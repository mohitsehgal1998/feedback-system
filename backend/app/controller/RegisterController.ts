import UserAuthRepository from "../repositories/user-auth-repository";

class RegisterController {
  async register(req: any, res: any) {
    try {
      const registerResponse = await UserAuthRepository.register(req.body);
      return res.status(200).json(registerResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new RegisterController();