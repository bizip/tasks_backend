/* eslint-disable quotes */

import dotenv from "dotenv";
import TaskService from "../../services/TaskService";

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
      //   const newTask = await TaskService.createTask(newTask);

      return res.status(200).json({ message: "List of all the tasks" });
    } catch (error) {
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
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }
}

export default TaskController;
