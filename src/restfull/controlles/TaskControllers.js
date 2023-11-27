/* eslint-disable quotes */

import dotenv from "dotenv";
import TaskService from "../../services/TaskService";
import DB from "../../database";

const { User } = DB;

dotenv.config();
// const { JWT_SECRET, FRONTEND_URL, EXPIRES_IN } = process.env;
/**
 * @class AuthController
 * @classdesc AuthController
 */

class TaskController {
  static async fetchAllTasks(req, res) {
    try {
      console.log(req.body);
      const data = await TaskService.findAllTasks();

      return res.status(200).json({ message: "List of all the tasks", data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }

  static async addNewTask(req, res) {
    try {
      const newTask = await TaskService.createTask(req.body);
      return res
        .status(200)
        .json({ message: "New Task added successfull", task: newTask });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }
}

export default TaskController;
