import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserAuthRepositoryContract from "../contracts/user-auth-repository";
import Users from "../models/Users";

class UserAuthRepository implements UserAuthRepositoryContract {
  async login(userData: { email: string; password: string }) {
    try {
      const { email, password } = userData;

      // Find user by email
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Compare provided password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return {
        success: true,
        data: {
          access_token: token,
          user: { name: user.name, email: user.email },
          type: "Bearer",
          expires_in: 3600,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error logging in");
    }
  }

  async register(userData: { name: string; email: string; password: string }) {
    try {
      const { name, email, password } = userData;

      // Check if user already exists
      let user = await Users.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }

      // Create new user
      user = new Users({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to the database
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return {
        success: true,
        data: {
          access_token: token,
          user: { name: user.name, email: user.email },
          type: "Bearer",
          expires_in: 3600,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error registering user");
    }
  }
}

export default new UserAuthRepository();
