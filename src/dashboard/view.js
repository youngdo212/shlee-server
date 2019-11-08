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
    this.$projectFormThumbnailInput = document.querySelector('#thumbnail');
    this.$projectFormThumbnailPreview = document.querySelector('.thumbnail-preview');
    this.$projectFormVideoUrlAddButton = document.querySelector('.form__button--add');
    this.$projectFormVideoUrlInputContainer = document.querySelector('.form__input-wrap--video');
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
   * Adds handler to thumbnail input on change event
   * @param {Function(File)} handler
   */
  onProjectFormThumbnailInputChange(handler) {
    this.$projectFormThumbnailInput.addEventListener('change', ({ target }) => {
      if (target.files.length === 0) return;

      const file = target.files[0];
      handler(file);
    });
  }

  /**
   * Adds handler to video url add button on click event
   * @param {Function()} handler
   */
  onProjectFormVideoUrlAddButtonClick(handler) {
    this.$projectFormVideoUrlAddButton.addEventListener('click', () => {
      handler();
    });
  }

  /**
   * Adds handler to video url input container on input event
   * @param {Function(Number, String)} handler Function called with index and video url on input event
   */
  onProjectFormVideoUrlInput(handler) {
    this.$projectFormVideoUrlInputContainer.addEventListener('input', ({ target }) => {
      const $addedInput = target.closest('.added-input');
      const { index } = $addedInput.dataset;
      const videoUrl = target.value;

      handler(Number(index), videoUrl);
    });
  }

  /**
   * Add handlers to video url input container
   * @param {Function(Number)} handler Called with index when remove button is clicked
   */
  onProjectFormVideoUrlRemoveButtonClick(handler) {
    this.$projectFormVideoUrlInputContainer.addEventListener('click', ({ target }) => {
      const $removeButton = target.closest('.added-input__button');

      if (!$removeButton) return;

      const $addedInput = target.closest('.added-input');
      const { index } = $addedInput.dataset;

      handler(Number(index));
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
   * Resets project form
   */
  clearProjectForm() {
    this.$projectFormTitleInput.value = '';
    this.$projectFormThumbnailPreview.innerHTML = '';
    this.$projectFormVideoUrlInputContainer.innerHTML = '';
  }

  /**
   * @param {String} url Indicates image
   */
  renderThumbnailPreview(url) {
    this.$projectFormThumbnailPreview.innerHTML = this.template.thumbnailPreviewImage(url);
  }

  /**
   * @param {Array} videoUrls
   */
  renderVideoUrlInputs(videoUrls) {
    this.$projectFormVideoUrlInputContainer.innerHTML = videoUrls.reduce((html, videoUrl, index) => html + this.template.videoUrlInput({ index, videoUrl }), '');
  }
}
