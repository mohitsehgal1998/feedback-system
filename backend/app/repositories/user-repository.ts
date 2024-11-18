import UserRepositoryContract from "../contracts/user-repository";
import Feedbacks from "../models/Feedbacks";
import Products from "../models/Products";

class UserRepository implements UserRepositoryContract {
  async submitFeedback(feedback: any) {
    try {
      const { name, email, comment, rating, product_id, status } = feedback;

      if (!product_id) {
        throw new Error("Product Id is needed.");
      }

      // Create a new feedback entr
      const newFeedback = new Feedbacks({ name, email, comment, rating, product_id, status });
      await newFeedback.save();

      return { success: true, message: "Feedback submitted successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Error saving feedback");
    }
  }

  async getProductsList() {
    try {
      // Fetch all products from the database
      const products = await Products.find(); // Assuming Product model uses Mongoose

      return { success: true, data: products };
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving products");
    }
  }
}

export default new UserRepository();
