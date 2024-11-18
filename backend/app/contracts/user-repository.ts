export default interface UserRepository {
  getProductsList(feedback: any): Promise<any>;
  submitFeedback(feedback: any): Promise<any>;
}
