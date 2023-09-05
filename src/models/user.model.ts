import { DataTypes, Optional, ModelDefined } from "sequelize";
import { UsersAttributes } from "./interfaces";
import { sequelize } from "../utils/database";

type UsersCreationAtrributes = Optional<UsersAttributes, "id" | "created_at" | "updated_at" | "deleted_at">;

const tableName = "users";

export const UsersTableName: string = tableName;
export const Users: ModelDefined<UsersAttributes, UsersCreationAtrributes> = sequelize.define(
  tableName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    name: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName,
    timestamps: false,
  }
);