import UserAuthRepository from "../repositories/user-auth-repository";

class LoginController {
  async login(req: any, res: any) {
    try {
      const loginResponse = await UserAuthRepository.login(req.body);
      return res.status(200).json(loginResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LoginController();