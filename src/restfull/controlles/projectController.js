/* eslint-disable quotes */

import dotenv from "dotenv";
import ProjectService from "../../services/ProjectServices";

dotenv.config();

class ProjectController {
  static async fetchAllProjects(req, res) {
    try {
      const data = await ProjectService.findAllProjects();
      return res
        .status(200)
        .json({ message: "List of all the Projects", data });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }

  static async addNewProject(req, res) {
    try {
      const project = await ProjectService.createProject(req.body);
      return res
        .status(200)
        .json({ message: "New Project added successfull", project });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Failled" });
    }
  }
}

export default ProjectController;
