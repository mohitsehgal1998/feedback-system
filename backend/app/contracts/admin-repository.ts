export default interface AdminRepository {
  getFeedbackList(): Promise<any>;
  getTeams(): Promise<any>;
  assignFeedbackToTeam(request: any): Promise<any>;
}
