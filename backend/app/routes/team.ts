import express from "express";
import UpdateFeedbackStatusController from "../controller/UpdateFeedbackStatusController";
import Auth from "../middleware/authMiddleware";
import ListFeedbackController from "../controller/ListFeedbackController";
const router = express.Router();

router.use(Auth);

/**
 * @swagger
 * /api/team/update-feedback-status:
 *   post:
 *     summary: Update the status of a feedback
 *     tags: [Team]
 *     security:
 *       - BearerAuth: []  # This requires a Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback_id:
 *                 type: string
 *                 description: The unique identifier of the feedback
 *                 example: "673b08faff154a5c280e25cf"
 *               status:
 *                 type: string
 *                 enum: ["in progress", "resolved", "pending"]
 *                 description: The new status of the feedback
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Feedback status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Feedback status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the feedback
 *                       example: "60d0fe4f5311236168a109ca"
 *                     name:
 *                       type: string
 *                       description: The name of the feedback
 *                       example: "Great service!"
 *                     status:
 *                       type: string
 *                       description: The updated status of the feedback
 *                       example: "completed"
 *       400:
 *         description: Bad request, possibly due to invalid feedback_id or status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid feedback ID or status"
 *       404:
 *         description: Feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Feedback not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error updating feedback status"
 */
router.post("/update-feedback-status", async (req: any, res: any) =>
  UpdateFeedbackStatusController.updadeFeedback(req, res)
);

/**
 * @swagger
 * /api/team/list-feedbacks:
 *   post:
 *     summary: Retrieve feedbacks for a team
 *     tags: [Team]
 *     security:
 *       - BearerAuth: []  # This requires a Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_id:
 *                 type: string
 *                 description: The unique identifier of the team to fetch feedback for
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Feedbacks retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the feedback
 *                         example: "60d0fe4f5311236168a109ca"
 *                       name:
 *                         type: string
 *                         description: The name of the feedback
 *                         example: "Great service!"
 *                       email:
 *                         type: string
 *                         description: The email of the person who left the feedback
 *                         example: "john@example.com"
 *                       comment:
 *                         type: string
 *                         description: The feedback comment
 *                         example: "Great experience, would recommend!"
 *                       rating:
 *                         type: number
 *                         description: The rating given in the feedback
 *                         example: 5
 *                       status:
 *                         type: string
 *                         description: The current status of the feedback
 *                         example: "resolved"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the feedback was created
 *                         example: "2024-11-18T12:34:56.789Z"
 *       400:
 *         description: Bad request, possibly due to invalid team_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Team ID is required."
 *       404:
 *         description: No feedbacks found for the provided team ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No feedbacks found for this team."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error fetching feedbacks."
 */
router.post("/list-feedbacks", async (req: any, res: any) =>
  ListFeedbackController.listFeedback(req, res)
);

export default router;