export default class Model {
  /**
   * @param {axios} axios
   */
  constructor(axios) {
    this.axios = axios;
  }

  /**
   * Gets a project using project id
   * @param {Object} query
   * @param {String} query.projectId
   * @returns {Promise} Promise object represents a project
   */
  async findProject({ projectId }) {

  }

  /**
   * Gets all projects
   * @returns {Promise} Promise object represents projects
   */
  async findAllProjects() {
    const { data: projects } = await this.axios.get(`${document.location.origin}/project`);
    return projects;
  }

  /**
   * Inserts project to database
   * @param {Object} project
   * @returns {Promise} Promise object represents nothing
   */
  async insertProject(project) {

  }

  /**
   * Updates project to database
   * @param {Object} project
   * @returns {Promise} Promise object represents nothing
   */
  async updateProject(project) {

  }

  /**
   * Deletes project and return the project
   * @param {Object} query
   * @param {String} query.projectId
   * @returns {Promise} Promise object represents deleted project
   */
  async deleteProject({ projectId }) {

  }
}
