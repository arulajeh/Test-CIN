import { Router } from "express";
import { UsersController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

export class UsersRoute {
  public router: Router = Router();
  private usersController: UsersController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.usersController = new UsersController();
    this.authMiddleware = new AuthMiddleware();
    this.routes();
  }

  private routes(): void {
    /**
     * @swagger
     * /api/register:
     *   post:
     *     tags:
     *       - Users
     *     description: Register new user
     *     summary: Register user
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/RegisterRequestDTO"
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: "#/components/schemas/CommonResponseDTO"
     *                 - type: object
     *                   properties:
     *                     data:
     *                       type: object
     *                       properties:
     *                         user:
     *                           type: object
     *                           properties:
     *                             email:
     *                               type: string
     *                             name:
     *                               type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     */
    this.router.post("/register", this.usersController.register);

    /**
     * @swagger
     * /api/login:
     *   post:
     *     tags:
     *       - Users
     *     description: Login User with Email & Password
     *     summary: Login User
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/LoginRequestDTO"
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: "#/components/schemas/CommonResponseDTO"
     *                 - type: object
     *                   properties:
     *                     data:
     *                       type: object
     *                       properties:
     *                         token:
     *                           type: string
     *                         user:
     *                           type: object
     *                           properties:
     *                             id:
     *                               type: string
     *                             email:
     *                               type: string
     *                             name:
     *                               type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     */
    this.router.post("/login", this.usersController.login);

    /**
     * @swagger
     * /api/me:
     *   get:
     *     tags:
     *       - Users
     *     description: Get user profile
     *     summary: Get user profile
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: "#/components/schemas/CommonResponseDTO"
     *                 - type: object
     *                   properties:
     *                     data:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                         email:
     *                           type: string
     *                         name:
     *                           type: string
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/CommonResponseDTO"
     */
    this.router.get("/me", this.authMiddleware.checkToken, this.usersController.me);
  }
}