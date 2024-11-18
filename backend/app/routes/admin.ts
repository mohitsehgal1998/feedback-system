import express from "express";
import Auth from "../middleware/authMiddleware.js";
import GetFeedbackController from "../controller/GetFeedbackController.ts";
import GetTeamsController from "../controller/GetTeamsController.ts";
import AssignFeedbackController from "../controller/AssignFeedbackController.ts";
const router = express.Router();

router.use(Auth);

/**
 * @swagger
 * /api/admin/feedback:
 *   get:
 *     summary: Retrieve feedback list
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   comment:
 *                     type: string
 *                   rating:
 *                     type: integer
 *             example:
 *               - name: John Doe
 *                 email: johndoe@example.com
 *                 comment: "Great service!"
 *                 rating: 5
 *               - name: Jane Smith
 *                 email: janesmith@example.com
 *                 comment: "Could be better."
 *                 rating: 3
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
 *               message: "Error retrieving feedback"
 */

router.get("/feedback", async (req: any, res: any) =>
  GetFeedbackController.getFeedback(req, res)
);

/**
 * @swagger
 * /api/admin/teams:
 *   get:
 *     summary: Get a list of all teams
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []  # This requires a Bearer token for authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the team
 *                       team_name:
 *                         type: string
 *                         description: Name of the team
 *                       description:
 *                         type: string
 *                         description: A short description of what the team does
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: Member's unique identifier
 *                             name:
 *                               type: string
 *                               description: Name of the team member
 *                             role:
 *                               type: string
 *                               enum: [admin, member]
 *                               description: The role of the team member (admin or member)
 *                             team_id:
 *                               type: string
 *                               description: The ID of the team the member belongs to
 *       400:
 *         description: Bad request, possibly due to invalid query or missing parameters
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
 *                   example: "Bad request"
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
 *                   example: "Error fetching teams"
 */

router.get("/teams", async (req: any, res: any) =>
  GetTeamsController.getTeams(req, res)
);

/**
 * @swagger
 * /api/admin/assign-feedback:
 *   post:
 *     summary: Assign feedback to a team
 *     tags: [Admin]
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
 *                 description: The unique identifier of the feedback to be assigned
 *                 example: "60d0fe4f5311236168a109ca"
 *               team_id:
 *                 type: string
 *                 description: The unique identifier of the team to assign the feedback to
 *                 example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: Feedback successfully assigned to the team
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
 *                   example: "Feedback assigned to the team successfully"
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
 *                     team_id:
 *                       type: string
 *                       description: The ID of the team the feedback was assigned to
 *                       example: "60d0fe4f5311236168a109cb"
 *                     status:
 *                       type: string
 *                       description: The status of the feedback
 *                       example: "assigned"
 *       400:
 *         description: Bad request, possibly due to invalid feedback_id or team_id
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
 *                   example: "Invalid feedback ID or team ID"
 *       404:
 *         description: Feedback or team not found
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
 *                   example: "Feedback or team not found"
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
 *                   example: "Error assigning feedback to team"
 */
router.post("/assign-feedback", async (req: any, res: any) =>
  AssignFeedbackController.assignFeedback(req, res)
);

export default router;
