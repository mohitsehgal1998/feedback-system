export default interface TeamRepository {
  updateFeedbackStatus(request: any): Promise<any>;
  listFeedback(request: any): Promise<any>;
}
