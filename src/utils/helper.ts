import { CommonResponseDTO } from "../dto";
import * as bcrypt from "bcrypt";

export class Helper {
  public generateResponse(status: number, message: string, httpCode?: number, data?: any): CommonResponseDTO {
    return {
      status: status,
      data: data || {},
      message: message,
      httpCode: httpCode
    };
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}