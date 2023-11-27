import sequelize from "./config/sequelize";
import ProjectModel from "./models/Project";
import TaskModel from "./models/Task";
import BlacklistedTokenModel from "./models/blacklistedToken";
import UserModel from "./models/user.model";

const DB = {
  sequelize,
  User: UserModel(sequelize),
  Task: TaskModel(sequelize),
  Project: ProjectModel(sequelize),
  BlacklistedToken: BlacklistedTokenModel(sequelize),
};

export default DB;
