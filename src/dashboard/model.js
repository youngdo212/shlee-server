import { assignObject } from './helpers';

export default class Model {
  /**
   * Instanciates model object
   */
  constructor() {
    this.projectList = [];
    this.projectFormState = {
      isOpened: false,
      id: 0,
      thumbnail: null,
      title: '',
      header: '',
      quickViewUrl: '',
      client: '',
      agency: '',
      role: '',
      category: 'work',
      headerImage: null,
      videoUrls: [],
      snapshotColumn: 1,
      snapshots: [],
    };
  }

  /**
   * Gets project using id
   * @param {Number} id
   * @returns {Object} Object represents project
   */
  findProject(id) {
    if (!this.projectList.length) return null;

    const targetProject = this.projectList.find((project) => project.id === id);

    if (!targetProject) return null;

    return { ...targetProject };
  }

  findProjectList() {
    return this.projectList.slice();
  }

  /**
   * Updates project list in app state and excute callback function
   * @param {Array} projects
   * @param {Funcion(projectList)} callback Function called after app state is updated
   */
  updateProjectList(projects, callback) {
    this.projectList = projects;
    callback(this.projectList.slice());
  }

  /**
   * Gets project form
   */
  findProjectFormState() {
    return { ...this.projectFormState };
  }

  /**
   * @param {Object} state
   * @param {Function(projectFormState)} [callback] Function called with updated project form state
   */
  updateProjectFormState(state, callback) {
    this.projectFormState = assignObject(this.projectFormState, state);
    callback && callback({ ...this.projectFormState });
  }
}
