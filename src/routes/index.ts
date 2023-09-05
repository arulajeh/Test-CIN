import * as express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../utils/swagger";
import cors from "cors";
import { UsersRoute } from "./users.route";

export class IndexRoute {
  public router: express.Router = express.Router();
  private usersRoute: UsersRoute

  constructor() {
    this.usersRoute = new UsersRoute();
    this.routes();
  }

  private routes(): void {
    this.router.use(cors());

    this.router.use("/", this.usersRoute.router);

    // Documentation Swagger
    this.router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router.get("/docs.json", (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }
}
