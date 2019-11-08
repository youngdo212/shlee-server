export default class Model {
  /**
   * Instanciates model object
   */
  constructor() {
    this.projectList = null;
    this.projectFormState = {
      isOpened: false,
      title: '',
      thumbnailImage: null,
      quickViewUrl: '',
      client: '',
      agency: '',
      role: '',
    };
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
   * @param {Boolean} state
   * @param {Function(projectFormState)} [callback] Function called with updated project form state
   */
  updateProjectFormState(state, callback) {
    this.projectFormState = { ...this.projectFormState, ...state };
    callback && callback({ ...this.projectFormState });
  }
}
