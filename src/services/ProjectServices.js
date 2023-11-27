/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-useless-catch
import DB from "../database";

const { Project } = DB;

/** Class representing Project services. */

class ProjectService {
  static async createProject(newProject) {
    try {
      const Projects = await Project.create(newProject);
      return Projects;
    } catch (error) {
      throw error;
    }
  }

  static async findAllProjects(param) {
    try {
      const Projects = await Project.findAll({
        where: param,
      });
      return Projects;
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectService;
