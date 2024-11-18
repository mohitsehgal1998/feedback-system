import AdminRepository from "../repositories/admin-repository";

class GetTeamsController {
  async getTeams(req, res) {
    try {
      const teamResponse = await AdminRepository.getTeams();
      return res.status(200).json(teamResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new GetTeamsController();