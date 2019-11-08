import axios from 'axios';
import MESSAGE from './msg';

export default class Controller {
  /**
   * @param {Model} model
   * @param {View} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.onProjectFormOpenButtonClick(this.handleProjectFormOpenButtonClick.bind(this));
    this.view.onProjectFormCloseButtonClick(this.handleProjectFormCloseButtonClick.bind(this));
    this.view.onProjectFormTitleInput(this.handleProjectFormTitleInput.bind(this));
  }

  /**
   * Sets up inital state of model and view
   */
  async setView() {
    const { data: projects } = await axios.get(`${document.location.origin}/project`);
    this.model.updateProjectList(projects, (projectList) => {
      this.view.renderProjectList(projectList);
    });
  }

  /**
   * Handles click event on button to open project form
   */
  handleProjectFormOpenButtonClick() {
    const { isOpened } = this.model.findProjectFormState();

    if (isOpened && confirm(MESSAGE.CREATE_NEW_PROJECT)) {
      this.clearProjectForm();
    } else {
      this.openProjectForm();
    }
  }

  /**
   * Makes project form visible
   */
  openProjectForm() {
    this.model.updateProjectFormState({
      isOpened: true,
    }, (projectFormState) => {
      this.view.setProjectFormVisibility(projectFormState.isOpened);
    });
  }

  /**
   * Handles click event on button to close project form
   */
  handleProjectFormCloseButtonClick() {
    if (!confirm(MESSAGE.CLOSE_PROJECT_FORM)) return;

    this.closeProjectForm();
    this.clearProjectForm();
  }

  /**
   * Makes project form invisible
   */
  closeProjectForm() {
    this.model.updateProjectFormState({
      isOpened: false,
    }, (projectFormState) => {
      this.view.setProjectFormVisibility(projectFormState.isOpened);
    });
  }

  clearProjectForm() {
    this.model.updateProjectFormState({
      title: '',
    }, (projectFormState) => {
      this.view.setProjectFormTitle(projectFormState);
    });
  }

  /**
   * Handles title string value
   * @param {String} title
   */
  handleProjectFormTitleInput(title) {
    this.model.updateProjectFormState({ title });
  }
}
