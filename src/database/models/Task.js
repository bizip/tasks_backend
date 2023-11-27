/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Task extends Model {}

const TaskModel = () => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date_from: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_to: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      assignees_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Assigneeses",
          key: "id",
        },
      },

      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      priority: {
        type: DataTypes.ENUM("low", "normal", "high"),
        defaultValue: "low",
      },
      attach: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "Tasks",
    }
  );

  return Task;
};

export default TaskModel;
