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
    this.router.post("/register", this.usersController.register);
    this.router.post("/login", this.usersController.login);
    this.router.get("/me", this.authMiddleware.checkToken, this.usersController.me);
  }
}