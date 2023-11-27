/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import DB from "../database";

const { Task, User } = DB;

/** Class representing Task services. */

class TaskService {
  static async createTask(newTask) {
    try {
      const tasks = await Task.create(newTask);
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async findByProp(prop) {
    try {
      const Tasks = await Task.findAll({
        where: prop,
      });
      return Tasks;
    } catch (error) {
      throw error;
    }
  }

  static updateAtt(set, prop) {
    return Task.update(set, {
      where: prop,
    });
  }

  static findById(modelId) {
    return Task.findOne({
      where: { id: modelId },
    });
  }

  static async findAllTasks(param) {
    try {
      const Tasks = await Task.findAll({
        include: [
          {
            model: User,
            as: "allAsignees",
            // attributes: ["id", "email"],
          },
        ],
      });
      return Tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} Tasks new message.
   */
  static async findOneTask(param) {
    try {
      const Tasks = await Task.findOne({
        where: param,
      });
      return Tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates returns a Task.
   * @param {object} param details of a message.
   * @returns {object} Tasks new message.
   */
  static async find(param) {
    try {
      const Tasks = await Task.findOne({
        where: param,
      });
      return Tasks;
    } catch (error) {
      throw error;
    }
  }

  static async findOrCreateTask(_Task) {
    try {
      const [Task, created] = await Task.findOrCreate({
        where: { microsoftId: _Task.microsoftId },
        defaults: _Task,
      });
      return Task;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;
