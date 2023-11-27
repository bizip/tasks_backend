/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Assignees extends Model {}

const AssigneesModel = () => {
  Assignees.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tasks",
          key: "id",
        },
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Assignees",
      tableName: "Assigneeses",
    }
  );

  return Assignees;
};

export default AssigneesModel;
