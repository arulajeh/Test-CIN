import { UsersService } from "../services";
import { NextFunction, Request, Response } from "express";
import { CLIENT_ERROR } from "../constants/httpCodes.json";
import { CommonRequestDTO, CommonResponseDTO } from "../dto";
import { createUserSchema, userLoginSchema } from "../validations";
import { Helper } from "../utils";

export class UsersController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const helper = new Helper();
      const usersService = new UsersService();
      const data: CommonRequestDTO = {
        body: req.body
      };
      const validations = createUserSchema.validate(data.body);
      if (validations.error) {
        const response: CommonResponseDTO = helper.generateResponse(0, validations.error.message);
        return res.status(CLIENT_ERROR.BAD_REQUEST).json(response);
      }
      const response: CommonResponseDTO = await usersService.register(data);
      const httpCode = response.httpCode as number;
      delete response.httpCode;
      res.status(httpCode).json(response);
    } catch (error) {
      console.info("error: ", error);
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const helper = new Helper();
      const usersService = new UsersService();
      const data: CommonRequestDTO = {
        body: req.body
      };
      const validations = userLoginSchema.validate(data.body);
      if (validations.error) {
        const response: CommonResponseDTO = helper.generateResponse(0, validations.error.message);
        return res.status(CLIENT_ERROR.BAD_REQUEST).json(response);
      }
      const response: CommonResponseDTO = await usersService.login(data);
      const httpCode = response.httpCode as number;
      delete response.httpCode;
      res.status(httpCode).json(response);
    } catch (error) {
      console.info("error: ", error);
      next(error);
    }
  }

  public async me(req: Request, res: Response, next: NextFunction) {
    try {
      const usersService = new UsersService();
      const data: CommonRequestDTO = {
        headers: req.headers
      };
      const response: CommonResponseDTO = usersService.me(data);
      const httpCode = response.httpCode as number;
      delete response.httpCode;
      res.status(httpCode).json(response);
    } catch (error) {
      console.info("error: ", error);
      next(error);
    }
  }
}