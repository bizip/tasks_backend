import sequelize from "./config/sequelize";
import BlacklistedTokenModel from "./models/blacklistedToken";
import UserModel from "./models/user.model";

const DB = {
  sequelize, // connection instance (RAW queries)
  User: UserModel(sequelize),
  BlacklistedToken: BlacklistedTokenModel(sequelize),
};

export default DB;
