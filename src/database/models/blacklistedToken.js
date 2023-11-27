/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class BlacklistedToken extends Model {}

const BlacklistedTokenModel = () => {
  BlacklistedToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      blacklistedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BlacklistedToken",
      tableName: "BlacklistedTokens",
    }
  );

  return BlacklistedToken;
};

export default BlacklistedTokenModel;
