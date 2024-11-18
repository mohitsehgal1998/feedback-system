import express from "express";
import FeedbackController from "../controller/FeedbackController.ts";
import Auth from "../middleware/authMiddleware.js";
import GetProductsController from "../controller/GetProductsController.ts";
const router = express.Router();

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return; // Already connected
//   await mongoose.connect(process.env.MONGODB_URI);
// };

router.use(Auth);

/**
 * @swagger
 * /api/user/feedback:
 *   post:
 *     summary: Submit feedback (user)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - comment
 *               - rating
 *               - product_id
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person submitting the feedback
 *               email:
 *                 type: string
 *                 description: Email of the person submitting the feedback
 *               comment:
 *                 type: string
 *                 description: Feedback comment
 *               rating:
 *                 type: integer
 *                 description: Rating from 1 to 5
 *               product_id:
 *                 type: string
 *                 description: The ID of the product for which feedback is being submitted
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               comment: "Great product!"
 *               rating: 5
 *               product_id: "64caa58de4b0f3e00c1d12ab"
 *               status: "pending"
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     comment:
 *                       type: string
 *                     rating:
 *                       type: integer
 *                     product_id:
 *                       type: string
 *                     status:
 *                       type: string
 *             example:
 *               success: true
 *               message: "Feedback submitted successfully"
 *               data:
 *                 name: John Doe
 *                 email: johndoe@example.com
 *                 comment: "Great product!"
 *                 rating: 5
 *                 product_id: "64caa58de4b0f3e00c1d12ab"
 *                 status: "pending"
 *       400:
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Error saving feedback"
 */


router.post("/feedback", async (req: any, res: any) =>
  FeedbackController.submitFeedback(req, res)
);

/**
 * @swagger
 * /api/user/product:
 *   get:
 *     summary: Retrieve product list
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the product
 *                       name:
 *                         type: string
 *                         description: Name of the product
 *                       price:
 *                         type: number
 *                         description: Price of the product
 *                       description:
 *                         type: string
 *                         description: Description of the product
 *                       stock:
 *                         type: integer
 *                         description: Stock availability of the product
 *                       category:
 *                         type: string
 *                         description: Category of the product
 *             example:
 *               success: true
 *               data:
 *                 - _id: "67372b9c488c2b932bf46876"
 *                   name: "Product 1"
 *                   price: 100
 *                   description: "Description of Product 1"
 *                   stock: 50
 *                   category: "Electronics"
 *                 - _id: "7a53b3e9c5678e9359c1290f"
 *                   name: "Product 2"
 *                   price: 150
 *                   description: "Description of Product 2"
 *                   stock: 30
 *                   category: "Home Appliances"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Error retrieving products"
 */
router.get("/product", async (req: any, res: any) =>
  GetProductsController.getProduct(req, res)
);

export default router;
