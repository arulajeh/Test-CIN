import * as express from "express";
import * as jwt from "jsonwebtoken";
import { CLIENT_ERROR } from "../constants/httpCodes.json";
import { Helper } from "../utils";
import { CommonResponseDTO } from "src/dto";

export class AuthMiddleware {
  public async checkToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const helper = new Helper();
    try {
      let decoded: any = {};
      let jwtError: any;
      const token = req.headers.authorization?.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET as string;

      jwt.verify(
        token as string, jwtSecret, { ignoreExpiration: false },
        async (err, decodedToken) => {
          if (err) {
            jwtError = err;
          }
          // Decode token
          decoded = decodedToken;
        }
      )

      if (jwtError) {
        const result: CommonResponseDTO = helper.generateResponse(0, "Unauthorized", CLIENT_ERROR.UNAUTHORIZED);
        const httpCode = result.httpCode as number;
        delete result.httpCode;
        return res.status(httpCode).json(result);
      }

      req.headers.user = decoded;
      next();
    } catch (error) {
      console.info("error: ", error);
      const result: CommonResponseDTO = helper.generateResponse(0, "Unauthorized", CLIENT_ERROR.UNAUTHORIZED);
      const httpCode = result.httpCode as number;
      delete result.httpCode;
      return res.status(httpCode).json(result);
    }
  }
}