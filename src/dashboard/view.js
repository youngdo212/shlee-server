export default class View {
  /**
   * Instanciates view object
   * @param {Object} template
   */
  constructor(template) {
    this.template = template;
    this.projectFormState = {
      isEditing: false,
      currentProjectId: '',
    };

    this.$projectList = document.querySelector('.index-section__project-list');
  }

  /**
   * Binds handler with button to create project
   * @param {Function(projectFormState)} hanlder Function called with project form state on click event
   */
  bindOpenProjectForm(hanlder) {

  }

  /**
   * Binds handler with button to close project form
   * @param {Function()} handler Function called on click event
   */
  bindCloseProjectForm(handler) {

  }

  /**
   * Binds handler with project form
   * @param {Function(project)} handler Function called with project object on submit event
   */
  bindSubmitProjectForm(handler) {

  }

  /**
   * Binds handler with project list
   * @param {Function(projectId, projectFormState)} handler Function called with target project id and project form state on click event
   */
  bindOpenProject(handler) {

  }

  /**
   * Binds handler with project list
   * @param {Function(projectId, projectFormState)} handler Function called with target project id and project form state on click event
   */
  bindRemoveProject(handler) {

  }

  /**
   * Renders project list again
   * @param {Array} projects
   */
  renderProjectList(projects) {
    this.$projectList.innerHTML = projects.reduce((html, project) => html + this.template.projectListItem(project), '');
  }

  /**
   * Puts the project form into edit mode
   */
  editProjectForm() {
    // 1. change form state to edit mode(isEditing)
    // 2. set form visible
  }

  /**
   * Brings the project form out of edit mode
   */
  editProjectFormDone() {
    // 1. change form state to not edit mode(isEditing)
    // 2. set form invisible
  }

  /**
   * removes all input values in form and delete current project id in form state
   */
  clearProjectForm() {
    // reset current project id in project form state
  }

  /**
   * Sets project form with values and images. and set project id to form state
   * @param {Project} project
   */
  setProjectForm(project) {
    // set project id to form state
  }
}
