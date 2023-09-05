import { CommonRequestDTO, CommonResponseDTO, RegisterDTO } from "../dto";
import { UsersDAO } from "../dao";
import { SUCCESS, CLIENT_ERROR } from "../constants/httpCodes.json";
import { Helper } from "../utils";
import * as jwt from "jsonwebtoken";

export class UsersService {
  private helper = new Helper();

  public async register(data: CommonRequestDTO) {
    try {
      const { body } = data;
      body.email = body.email.toLowerCase();
      const usersDAO = new UsersDAO();
      const user = await usersDAO.getByEmail(body.email);
      if (user) {
        const response: CommonResponseDTO = this.helper.generateResponse(0, "Email already exists", CLIENT_ERROR.BAD_REQUEST);
        return response;
      }
      const newUser = await usersDAO.create(body as RegisterDTO);
      const response: CommonResponseDTO = this.helper.generateResponse(1, "Register successfully", SUCCESS.OK,
        { email: newUser.email, name: newUser.name }
      );
      return response;
    } catch (error) {
      console.info("error: ", error);
      throw error;
    }
  }

  public async login(data: CommonRequestDTO) {
    try {
      const { body } = data;
      body.email = body.email.toLowerCase();
      const usersDAO = new UsersDAO();
      const user = await usersDAO.getByEmail(body.email);
      if (!user) {
        const response: CommonResponseDTO = this.helper.generateResponse(0, "Invalid email or password", CLIENT_ERROR.BAD_REQUEST);
        return response;
      }
      const isPasswordValid = await this.helper.comparePassword(body.password, user.password);
      if (!isPasswordValid) {
        const response: CommonResponseDTO = this.helper.generateResponse(0, "Invalid email or password", CLIENT_ERROR.BAD_REQUEST);
        return response;
      }
      const jwtSecret = process.env.JWT_SECRET as string;
      const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;
      const jwtPayload = { id: user.id, email: user.email, name: user.name }
      const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpiresIn });
      const response: CommonResponseDTO = this.helper.generateResponse(1, "Login successfully", SUCCESS.OK,
        { token, user: jwtPayload }
      );
      return response;
    } catch (error) {
      console.info("error: ", error);
      throw error;
    }
  }

  public me(data: CommonRequestDTO) {
    try {
      const { user } = data.headers;
      const response: CommonResponseDTO = this.helper.generateResponse(1, "Get user successfully", SUCCESS.OK, {
        id: user.id,
        email: user.email,
        name: user.name
      });
      return response;
    } catch (error) {
      console.info("error: ", error);
      throw error;
    }
  }
}