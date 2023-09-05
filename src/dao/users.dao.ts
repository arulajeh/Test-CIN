import { Op } from 'sequelize';
import { Users } from "../models";
import { Helper } from "../utils";
import { RegisterDTO } from 'src/dto';

export class UsersDAO {
  private filterDeleted = { deleted_at: { [Op.is]: null } };
  private attributes = { exclude: ["deleted_at"] };
  private helper = new Helper();

  public async getByEmail(email: string) {
    try {
      const conditions = [];
      conditions.push(this.filterDeleted);
      conditions.push({ email });
      const data = await Users.findOne({ where: { [Op.and]: conditions }, attributes: this.attributes });
      return data?.get({ plain: true });
    } catch (error) {
      console.info("error: ", error);
      throw error;
    }
  }

  public async create(data: RegisterDTO) {
    try {
      const { email, password, name } = data;
      const hashedPassword = await this.helper.hashPassword(password);
      const user = await Users.create({ email, password: hashedPassword, name });
      return user?.get({ plain: true });
    } catch (error) {
      console.info("error: ", error);
      throw error;
    }
  }
}