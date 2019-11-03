import MESSAGE from './msg';

export default class Controller {
  /**
   * @param {Model} model
   * @param {View} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindOpenProjectForm(this.openProject.bind(this));
    this.view.bindCloseProjectForm(this.closeProjectForm.bind(this));
    this.view.bindSubmitProjectForm(this.submitProjectForm.bind(this));
    this.view.bindOpenProject(this.openProject.bind(this));
    this.view.bindRemoveProject(this.removeProject.bind(this));
  }

  /**
   * Sets up view initial state
   */
  async setView() {
    const projects = await this.model.findAllProjects();
    this.view.renderProjectList(projects);
  }

  /**
   * Shows project form and get ready to edit.
   * @param {Object} projectFormState
   * @param {Boolean} projectFormState.isEditing
   */
  openProjectForm({ isEditing }) {
    if (isEditing) {
      confirm(MESSAGE.CREATE_NEW_PROJECT) && this.view.clearProjectForm();
    } else {
      this.view.editProjectForm();
    }
  }

  /**
   * Clear project form values and closes form
   */
  closeProjectForm() {
    if (!confirm(MESSAGE.CANCEL_TO_CREATE_NEW_PROJECT)) return;

    this.view.clearProjectForm();
    this.view.editProjectFormDone();
  }

  /**
   * Submit project and close form
   * @param {object} project
   */
  async submitProjectForm(project) {
    if (project.id) {
      await this.updateProject(project);
    } else {
      await this.createProject(project);
    }

    this.view.clearProjectForm();
    this.view.editProjectFormDone();
  }

  /**
   * Creates project
   * @param {Object} project
   */
  async createProject(project) {
    await this.model.insertProject(project);
  }

  /**
   * Updates project
   * @param {Object} project
   */
  async updateProject(project) {
    await this.model.updateProject(project);
  }

  /**
   * Loads project and show details in project form
   * @param {String} projectId
   * @param {Object} projectFormState
   * @param {Boolean} projectFormState.isEditing
   */
  async openProject(projectId, { isEditing }) {
    if (isEditing) {
      if (!confirm(MESSAGE.OPEN_PROJECT)) return;
      const project = await this.model.findProject({ projectId });
      this.view.clearProjectForm();
      this.view.setProjectForm(project);
    } else {
      const project = await this.model.findProject({ projectId });
      this.view.editProjectForm();
      this.view.setProjectForm(project);
    }
  }

  /**
   * Removes project and show project list again excluding the project
   * @param {String} projectId
   * @param {Object} projectFormState
   * @param {String} projectFormState.currentProjectId
   */
  async removeProject(projectId, { currentProjectId }) {
    if (!confirm(MESSAGE.REMOVE_PROJECT)) return;

    await this.model.deleteProject({ projectId });
    const projects = await this.model.findAllProjects();
    this.view.renderProjectList(projects);
    if (projectId === currentProjectId) {
      this.view.clearProjectForm();
      this.view.editProjectFormDone();
    }
  }
}
