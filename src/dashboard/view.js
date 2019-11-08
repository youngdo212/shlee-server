export default class View {
  /**
   * Instanciates view object
   * @param {Object} template
   */
  constructor(template) {
    this.template = template;
    this.$projectList = document.querySelector('.index-section__project-list');
    this.$projectFormOpenButton = document.querySelector('.index-section__create-button');
    this.$projectFormCloseButton = document.querySelector('.form__close-button');
    this.$projectForm = document.querySelector('.form');
    this.$projectFormTitleInput = document.querySelector('#title');
  }

  /**
   * Binds handler with button to open project form
   * @param {Function()} handler Function called after click
   */
  onProjectFormOpenButtonClick(handler) {
    this.$projectFormOpenButton.addEventListener('click', () => {
      handler();
    });
  }

  /**
   * Binds handler with button to close project form
   * @param {Function()} handler Function called after click
   */
  onProjectFormCloseButtonClick(handler) {
    this.$projectFormCloseButton.addEventListener('click', () => {
      handler();
    });
  }

  /**
   * Adds handler to project form title input
   * @param {Function(String)} handler Function called every input event
   */
  onProjectFormTitleInput(handler) {
    this.$projectFormTitleInput.addEventListener('input', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * Renders project list again
   * @param {Array} projectList
   */
  renderProjectList(projectList) {
    this.$projectList.innerHTML = projectList.reduce((html, project) => html + this.template.projectListItem(project), '');
  }

  /**
   * Change project form visibility
   * @param {Boolean} visible
   */
  setProjectFormVisibility(visible) {
    if (visible) {
      this.$projectForm.classList.remove('form--hide');
    } else {
      this.$projectForm.classList.add('form--hide');
    }
  }

  /**
   * Change project form title input
   * @param {Object} projectFormState
   * @param {String} projectFormState.title
   */
  setProjectFormTitle({ title }) {
    this.$projectFormTitleInput.value = title;
  }
}
