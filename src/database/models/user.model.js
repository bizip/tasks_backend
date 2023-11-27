/* eslint-disable no-unused-vars */
import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
export class User extends Model {}

const UserModel = () => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "manager", "admin"),
        defaultValue: "user",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "tbl_users",
      timestamps: true,
      sequelize,
    }
  );
  return User;
};

export default UserModel;
