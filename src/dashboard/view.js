import { Sortable } from '@shopify/draggable';
import ProjectFormOpenButton from './components/ProjectFormOpenButton';
import ProjectFormCloseButton from './components/ProjectFormCloseButton';
import './components/ProjectFormSubmitButton';
import SnapshotAddButton from './components/SnapshotAddButton';
import SnapshotUpdateButtons from './components/SnapshotUpdateButtons';
import SnapshotRemoveButtons from './components/SnapshotRemoveButtons';
import ProjectListRemoveButtons from './components/ProjectListRemoveButtons';
import VideoUrlAddButton from './components/VideoUrlAddButton';
import ProjectFormTitleInput from './components/ProjectFormTitleInput';
import ProjectFormHeaderInput from './components/ProjectFormHeaderInput';
import ProjectFormSnapshotColumnInput from './components/ProjectFormSnapshotColumnInput';
import ProjectFormQuickViewUrlInput from './components/ProjectFormQuickViewUrlInput';
import ProjectFormClientInput from './components/ProjectFormClientInput';
import ProjectFormAgencyInput from './components/ProjectFormAgencyInput';
import ProjectFormRoleInput from './components/ProjectFormRoleInput';
import ProjectFormVideoUrlInputList from './components/ProjectFormVideoUrlInputList';


export default class View {
  /**
   * Instanciates view object
   * @param {Object} template
   */
  constructor(template) {
    this.template = template;
    this.$projectList = document.querySelector('.index-section__project-list');
    this.$projectFormOpenButton = new ProjectFormOpenButton();
    this.$projectFormCloseButton = new ProjectFormCloseButton();
    this.$projectForm = document.querySelector('.form');
    this.$projectFormTitleInput = new ProjectFormTitleInput();
    this.$projectFormHeaderInput = new ProjectFormHeaderInput();
    this.$projectFormQuickViewUrlInput = new ProjectFormQuickViewUrlInput();
    this.$projectFormClientInput = new ProjectFormClientInput();
    this.$projectFormAgencyInput = new ProjectFormAgencyInput();
    this.$projectFormRoleInput = new ProjectFormRoleInput();
    this.$projectFormThumbnail = document.querySelector('.thumbnail-preview-wrap');
    this.$projectFormThumbnailInput = document.querySelector('#thumbnail');
    this.$projectFormThumbnailPreview = document.querySelector('.thumbnail-preview');
    this.$projectFormVideoUrlAddButton = new VideoUrlAddButton();
    this.$projectFormVideoUrlInputList = new ProjectFormVideoUrlInputList();
    this.$projectFormSnapshotAddButton = new SnapshotAddButton();
    this.$projectFormSnapshotAddInput = document.querySelector('.snapshot__input--add');
    this.$projectFormSnapshotPreviewContainer = document.querySelector('.snapshot-preview');
    this.$projectFormSnapshotUpdateInput = document.querySelector('.snapshot__input--update');
    this.$projectFormCategoryInputContainer = document.querySelector('.form__input-wrap--category');
    this.$projectFormHeaderImage = document.querySelector('.header-image-preview-wrap');
    this.$projectFormHeaderImageInput = document.querySelector('#header-image');
    this.$projectFormHeaderImagePreview = document.querySelector('.header-image-preview');
    this.$projectFormSnapshotColumnInput = new ProjectFormSnapshotColumnInput();
    this.$projectFormValidationMessage = document.querySelector('.form__validation-message');

    this.handleProjectSorted = null;
    this.sortableProjectList = null;
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
    this.$projectFormVideoUrlInputList.addEventListener('input', (videoUrl, index) => {
      handler(videoUrl, index);
    });
  }

  /**
   * Add handlers to video url input container
   * @param {Function(Number)} handler Called with index when remove button is clicked
   */
  onProjectFormVideoUrlRemoveButtonClick(handler) {
    this.$projectFormVideoUrlInputList.addEventListener('click', (index) => {
      handler(index);
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
      if (!target.closest('.snapshot-remove-button-container')) return;

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
      if (!target.closest('.snapshot-update-button-container')) return;

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
      handler(target.value);
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
      if (target.closest('.project-list-remove-button-container')) return;

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
      if (!target.closest('.project-list-remove-button-container')) return;

      const $project = target.closest('.index-section__project');
      const projectId = $project.dataset.id;

      handler(Number(projectId));
    });
  }

  onProjectSorted(handler) {
    this.handleProjectSorted = handler;
  }

  /**
   * Renders project list again
   * @param {Array} projectList
   */
  renderProjectList(projectList) {
    if (this.sortableProjectList) this.sortableProjectList.destroy();

    this.$projectList.innerHTML = projectList.reduce((html, project) => html + this.template.projectListItem(project), '');
    this.sortableProjectList = new Sortable(this.$projectList, {
      draggable: 'li',
    });
    this.sortableProjectList.on('sortable:stop', ({ oldIndex, newIndex }) => this.handleProjectSorted(oldIndex, newIndex));
    ProjectListRemoveButtons.update();
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
    this.$projectFormTitleInput.setValue('');
    this.$projectFormHeaderInput.setValue('');
    this.$projectFormQuickViewUrlInput.setValue('');
    this.$projectFormClientInput.setValue('');
    this.$projectFormAgencyInput.setValue('');
    this.$projectFormRoleInput.setValue('');
    this.setProjectFormCategory('work');
    this.$projectFormHeaderImagePreview.innerHTML = '';
    // Removes all video url inputs
    this.renderVideoUrlInputs([]);
    this.$projectFormSnapshotColumnInput.setValue(1);
    // Remove all snapshot previews
    while (this.$projectFormSnapshotPreviewContainer.children.length) {
      this.removeSnapshotPreview(0);
    }
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
    this.$projectFormVideoUrlInputList.render(videoUrls);
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

    SnapshotUpdateButtons.update();
    SnapshotRemoveButtons.update();
  }

  /**
   * Removes snapshot preview element at index into the snapshot preview container
   * @param {Number} index
   */
  removeSnapshotPreview(index) {
    const $snapshotPreview = this.$projectFormSnapshotPreviewContainer.children[index];
    const $snapshotUpdateButtonContainer = $snapshotPreview.querySelector('.snapshot-update-button-container');
    const $snapshotRemoveButtonContainer = $snapshotPreview.querySelector('.snapshot-remove-button-container');

    SnapshotUpdateButtons.remove($snapshotUpdateButtonContainer);
    SnapshotRemoveButtons.remove($snapshotRemoveButtonContainer);
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
    this.$projectFormTitleInput.setError(false);
    this.$projectFormHeaderImage.classList.remove('header-image-preview-wrap--invalid');
    this.$projectFormValidationMessage.classList.remove('form__validation-message--invalid');
    this.$projectFormSnapshotColumnInput.setError(false);
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
    this.$projectFormTitleInput.setError(true, message);
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
   * Shows validation message of snapshot column
   * @param {string} message
   */
  setSnapshotColumnValidationMessage(message) {
    this.$projectFormSnapshotColumnInput.setError(true, message);
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
    (title !== undefined) && this.$projectFormTitleInput.setValue(title);
    (header !== undefined) && this.$projectFormHeaderInput.setValue(header);
    (quickViewUrl !== undefined) && this.$projectFormQuickViewUrlInput.setValue(quickViewUrl);
    (client !== undefined) && this.$projectFormClientInput.setValue(client);
    (agency !== undefined) && this.$projectFormAgencyInput.setValue(agency);
    (role !== undefined) && this.$projectFormRoleInput.setValue(role);
    (snapshotColumn !== undefined) && this.$projectFormSnapshotColumnInput.setValue(snapshotColumn);
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
