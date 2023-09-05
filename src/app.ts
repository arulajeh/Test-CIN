import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { IndexRoute } from "./routes";
import { CLIENT_ERROR, SERVER_ERROR } from "./constants/httpCodes.json";
import { CommonResponseDTO } from "./dto";
import { Helper } from "./utils/helper";

class App {
  public app: express.Application;
  private helper: Helper = new Helper();
  private indexRoute: IndexRoute;

  constructor() {
    this.app = express.default();
    this.indexRoute = new IndexRoute();
    this.config();
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));

    // Routes
    this.app.use("/api", this.indexRoute.router);

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const response: CommonResponseDTO = this.helper.generateResponse(0, "Resource not found");
      return res.status(CLIENT_ERROR.NOT_FOUND).json(response);
    });

    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err) {
        const response: CommonResponseDTO = this.helper.generateResponse(0, "System error, please try again");
        return res.status(SERVER_ERROR.INTERNAL_SERVER_ERROR).json(response);
      }
    });
  }
}

export default new App().app;
