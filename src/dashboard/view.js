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
    this.$projectFormHeaderInput = document.querySelector('#header');
    this.$projectFormQuickViewUrlInput = document.querySelector('#quick-view-url');
    this.$projectFormClientInput = document.querySelector('#client');
    this.$projectFormAgencyInput = document.querySelector('#agency');
    this.$projectFormRoleInput = document.querySelector('#role');
    this.$projectFormThumbnail = document.querySelector('.thumbnail-preview-wrap');
    this.$projectFormThumbnailInput = document.querySelector('#thumbnail');
    this.$projectFormThumbnailPreview = document.querySelector('.thumbnail-preview');
    this.$projectFormVideoUrlAddButton = document.querySelector('.form__button--add');
    this.$projectFormVideoUrlInputContainer = document.querySelector('.form__input-wrap--video');
    this.$projectFormSnapshotAddButton = document.querySelector('.snapshot-preview__add-button');
    this.$projectFormSnapshotAddInput = document.querySelector('.snapshot__input--add');
    this.$projectFormSnapshotPreviewContainer = document.querySelector('.snapshot-preview');
    this.$projectFormSnapshotUpdateInput = document.querySelector('.snapshot__input--update');
    this.$projectFormCategoryInputContainer = document.querySelector('.form__input-wrap--category');
    this.$projectFormHeaderImage = document.querySelector('.header-image-preview-wrap');
    this.$projectFormHeaderImageInput = document.querySelector('#header-image');
    this.$projectFormHeaderImagePreview = document.querySelector('.header-image-preview');
    this.$projectFormSnapshotColumnInput = document.querySelector('#snapshot-column');
    this.$projectFormValidationMessage = document.querySelector('.form__validation-message');
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

  onProjectFormHeaderInput(handler) {
    this.$projectFormHeaderInput.addEventListener('input', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * Adds handler to project form quick view url input
   * @param {Function(String)} handler Function called every input event
   */
  onProjectFormQuickViewUrlInput(handler) {
    this.$projectFormQuickViewUrlInput.addEventListener('input', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * Adds handler to project form client input
   * @param {Function(String)} handler Function called every input event
   */
  onProjectFormClientInput(handler) {
    this.$projectFormClientInput.addEventListener('input', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * Adds handler to project form agency input
   * @param {Function(String)} handler Function called every input event
   */
  onProjectFormAgencyInput(handler) {
    this.$projectFormAgencyInput.addEventListener('input', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * Adds handler to project form role input
   * @param {Function(String)} handler Function called every input event
   */
  onProjectFormRoleInput(handler) {
    this.$projectFormRoleInput.addEventListener('input', ({ target }) => {
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
      target.value = '';
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
   * Adds handler to trigger click event to snapshot input with add button.
   * And adds handler with snapshot input button on change event.
   * @param {Function(File[])} handler
   */
  onProjectFormSnapshotAdded(handler) {
    this.$projectFormSnapshotAddButton.addEventListener('click', () => {
      this.$projectFormSnapshotAddInput.click();
    });

    this.$projectFormSnapshotAddInput.addEventListener('change', ({ target }) => {
      if (target.files.length === 0) return;

      const { files } = target;
      const fileArray = [...files];
      target.value = '';
      handler(fileArray);
    });
  }

  /**
   * Adds handler to snapshot preview container
   * @param {Function(index)} handler Called when remove button is clicked
   */
  onProjectFormSnapshotRemoved(handler) {
    this.$projectFormSnapshotPreviewContainer.addEventListener('click', ({ target }) => {
      if (target.className !== 'snapshot-preview__remove-button') return;

      const $snapshotPreview = target.closest('.snapshot-preview__item');
      const snapshotPreviews = [...this.$projectFormSnapshotPreviewContainer.children];
      const index = snapshotPreviews.indexOf($snapshotPreview);

      handler(index);
    });
  }

  /**
   * Adds handler to snapshot update input.
   * And handler to trigger click event at snapshot update input to remove button
   * @param {Function(index, File)} handler Called when snapshot update input is changed
   */
  onProjectFormSnapshotUpdated(handler) {
    let index = 0;

    this.$projectFormSnapshotPreviewContainer.addEventListener('click', ({ target }) => {
      if (target.className !== 'snapshot-preview__update-button') return;

      const $snapshotPreview = target.closest('.snapshot-preview__item');
      const snapshotPreviews = [...this.$projectFormSnapshotPreviewContainer.children];
      index = snapshotPreviews.indexOf($snapshotPreview);

      this.$projectFormSnapshotUpdateInput.click();
    });

    this.$projectFormSnapshotUpdateInput.addEventListener('change', ({ target }) => {
      if (target.files.length === 0) return;

      const file = target.files[0];

      target.value = '';
      handler(index, file);
    });
  }

  /**
   * Adds handler to catogory input container
   * @param {Function(String)} handler Called with radio button value
   */
  onProjectFormCategoryChange(handler) {
    this.$projectFormCategoryInputContainer.addEventListener('change', ({ target }) => {
      handler(target.value);
    });
  }

  /**
   * @param {Function(File)} handler
   */
  onProjectFormHeaderImageInputChange(handler) {
    this.$projectFormHeaderImageInput.addEventListener('change', ({ target }) => {
      if (!target.files.length) return;

      const file = target.files[0];
      target.value = '';
      handler(file);
    });
  }

  /**
   * @param {Function(Number)} handler
   */
  onProjectFormSnapshotColumnInput(handler) {
    this.$projectFormSnapshotColumnInput.addEventListener('input', ({ target }) => {
      handler(Number(target.value));
    });
  }

  /**
   * Adds handler to form
   * @param {Function()} handler
   */
  onProjectFormSubmit(handler) {
    this.$projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Adds handler to project list
   * @param {Function(Number)} handler Called with project id
   */
  onProjectClick(handler) {
    this.$projectList.addEventListener('click', ({ target }) => {
      if (target.className === 'index-section__project-remove-button') return;

      const $project = target.closest('.index-section__project');

      if (!$project) return;

      const projectId = $project.dataset.id;

      handler(Number(projectId));
    });
  }

  /**
   * Adds handler to project list
   * @param {Function(Number)} handler Called with project id
   */
  onProjectRemoveButtonClick(handler) {
    this.$projectList.addEventListener('click', ({ target }) => {
      if (target.className !== 'index-section__project-remove-button') return;

      const $project = target.closest('.index-section__project');
      const projectId = $project.dataset.id;

      handler(Number(projectId));
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
  clearProjectFormValues() {
    this.$projectFormThumbnailPreview.innerHTML = '';
    this.$projectFormTitleInput.value = '';
    this.$projectFormHeaderInput.value = '';
    this.$projectFormQuickViewUrlInput.value = '';
    this.$projectFormClientInput.value = '';
    this.$projectFormAgencyInput.value = '';
    this.$projectFormRoleInput.value = '';
    this.setProjectFormCategory('work');
    this.$projectFormHeaderImagePreview.innerHTML = '';
    this.$projectFormVideoUrlInputContainer.innerHTML = '';
    this.$projectFormSnapshotColumnInput.value = 1;
    this.$projectFormSnapshotPreviewContainer.innerHTML = '';
  }

  /**
   * @param {String} imageUrl Indicates image
   */
  renderThumbnailPreview(imageUrl) {
    this.$projectFormThumbnailPreview.innerHTML = this.template.thumbnailPreviewImage(imageUrl);
  }

  /**
   * @param {Array} videoUrls
   */
  renderVideoUrlInputs(videoUrls) {
    this.$projectFormVideoUrlInputContainer.innerHTML = videoUrls.reduce((html, videoUrl, index) => html + this.template.videoUrlInput({ index, videoUrl }), '');
  }

  /**
   * Renders preview using image url
   * @param {String} url
   * @param {Object} options
   * @param {Boolean} options.mutable Enables snapshot to change
   */
  addSnapshotPreview(url, options = { mutable: true }) {
    this.$projectFormSnapshotPreviewContainer.insertAdjacentHTML(
      'beforeend',
      this.template.snapshotPreview({
        url,
        cover: !options.mutable,
      }),
    );
  }

  /**
   * Removes snapshot preview element at index into the snapshot preview container
   * @param {Number} index
   */
  removeSnapshotPreview(index) {
    const $snapshotPreview = this.$projectFormSnapshotPreviewContainer.children[index];
    this.$projectFormSnapshotPreviewContainer.removeChild($snapshotPreview);
  }

  /**
   * Changes snapshot preview element src attribute at index
   * @param {Number} index
   * @param {String} imageUrl
   */
  updateSnapshotPreview(index, imageUrl) {
    const $snapshotPreview = this.$projectFormSnapshotPreviewContainer.children[index];
    const $snapshotPreviewImage = $snapshotPreview.querySelector('img');

    $snapshotPreviewImage.src = imageUrl;
  }

  /**
   * @param {String} category
   */
  setProjectFormCategory(category) {
    const $categoryInput = this.$projectFormCategoryInputContainer.querySelector(`input[value="${category}"]`);
    $categoryInput.checked = true;
  }

  /**
   * @param {String} imageUrl
   */
  renderHeaderImagePreview(imageUrl) {
    this.$projectFormHeaderImagePreview.innerHTML = this.template.headerImagePreview(imageUrl);
  }

  /**
   * Hides all validation messages
   */
  clearAllValidatonMessages() {
    this.$projectFormThumbnail.classList.remove('thumbnail-preview-wrap--invalid');
    this.$projectFormTitleInput.classList.remove('title--invalid');
    this.$projectFormHeaderImage.classList.remove('header-image-preview-wrap--invalid');
    this.$projectFormValidationMessage.classList.remove('form__validation-message--invalid');
  }

  /**
   * Shows validation message of form
   * @param {String} message
   */
  setFormValidationMessage(message) {
    this.$projectFormValidationMessage.classList.add('form__validation-message--invalid');
    this.$projectFormValidationMessage.textContent = message;
  }

  /**
   * Shows validation message of thumbnail
   * @param {String} message
   */
  setThumbnailValidationMessage(message) {
    const $thumbnailValidationMessage = this.$projectFormThumbnail.querySelector('.thumbnail__validation-message');

    this.$projectFormThumbnail.classList.add('thumbnail-preview-wrap--invalid');
    $thumbnailValidationMessage.textContent = message;
  }

  /**
   * Shows validation message of title
   * @param {String} message
   */
  setTitleValidationMessage(message) {
    const $titleValidationMessage = this.$projectForm.querySelector('.title__validation-message');

    this.$projectFormTitleInput.classList.add('title--invalid');
    $titleValidationMessage.textContent = message;
  }

  /**
   * Shows validation message of header image
   * @param {String} message
   */
  setHeaderImageValidationMessage(message) {
    const $headerImageValidationMessage = this.$projectFormHeaderImage.querySelector('.header-image__validation-message');

    this.$projectFormHeaderImage.classList.add('header-image-preview-wrap--invalid');
    $headerImageValidationMessage.textContent = message;
  }

  /**
   * Sets project form input value
   * @param {Object} values
   * @param {String} values.title
   * @param {String} values.quickViewUrl
   * @param {String} values.client
   * @param {String} values.agency
   * @param {String} values.role
   * @param {Number} values.snapshotColumn
   */
  setProjectFormInputValue({
    title, header, quickViewUrl, client, agency, role, snapshotColumn,
  }) {
    this.$projectFormTitleInput.value = title;
    this.$projectFormHeaderInput.value = header;
    this.$projectFormQuickViewUrlInput.value = quickViewUrl;
    this.$projectFormClientInput.value = client;
    this.$projectFormAgencyInput.value = agency;
    this.$projectFormRoleInput.value = role;
    this.$projectFormSnapshotColumnInput.value = snapshotColumn;
  }

  /**
   *
   * @param {Number} index
   * @param {Boolean} mutablility
   */
  setSnapshotPreviewMutability(index, mutablility) {
    const $snapshotPreview = this.$projectFormSnapshotPreviewContainer.children[index];
    const $snapshotCover = $snapshotPreview.querySelector('.snapshot-preview__cover');

    if (mutablility === true) {
      $snapshotCover.classList.add('snapshot-preview__cover--hide');
    } else {
      $snapshotCover.classList.remove('snapshot-preview__cover--hide');
    }
  }

  /**
   * Sets up all project form values with opened project
   * @param {Object} project
   * @param {Object} options
   * @param {Boolean} options.mutable Represents whether preview can be updated or not
   */
  setProjectForm({
    thumbnailImageUrl, headerImageUrl, snapshotUrls, videoUrls, ...project
  }, options = { mutable: true }) {
    this.renderThumbnailPreview(thumbnailImageUrl, options);
    this.renderHeaderImagePreview(headerImageUrl, options);
    snapshotUrls.forEach((snapshotUrl) => this.addSnapshotPreview(snapshotUrl, options));
    this.renderVideoUrlInputs(videoUrls);
    this.setProjectFormInputValue(project);
  }
}
