import axios from 'axios';
import MESSAGE from './msg';
import { readFileAsDataUrl } from './helpers';

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
    this.view.onProjectFormThumbnailInputChange(this.handleProjectFormThumbnailChange.bind(this));
    this.view.onProjectFormVideoUrlAddButtonClick(this.handleProjectFormVideoUrlAddButtonClick.bind(this));
    this.view.onProjectFormVideoUrlInput(this.handleProjectFormVideoUrlInput.bind(this));
    this.view.onProjectFormVideoUrlRemoveButtonClick(this.handleProjectFormVideoUrlRemoveButtonClick.bind(this));
    this.view.onProjectFormSnapshotAdded(this.handleProjectFormSnapshotAdded.bind(this));
    this.view.onProjectFormSnapshotRemoved(this.handleProjectFormSnapshotRemoved.bind(this));
    this.view.onProjectFormSnapshotUpdated(this.handleProjectFormSnapshotUpdated.bind(this));
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

    if (isOpened) {
      if (!confirm(MESSAGE.CREATE_NEW_PROJECT)) return;

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

  /**
   * Resets project form
   */
  clearProjectForm() {
    this.model.updateProjectFormState({
      title: '',
      thumbnail: null,
      videoUrls: [],
      snapshots: [],
    }, () => {
      this.view.clearProjectForm();
    });
  }

  /**
   * Handles title string value
   * @param {String} title
   */
  handleProjectFormTitleInput(title) {
    this.model.updateProjectFormState({ title });
  }

  /**
   * @param {File} file File uploaded by input
   */
  handleProjectFormThumbnailChange(file) {
    this.model.updateProjectFormState({
      thumbnail: file,
    }, async ({ thumbnail }) => {
      const thumbnailDataUrl = await readFileAsDataUrl(thumbnail);
      this.view.renderThumbnailPreview(thumbnailDataUrl);
    });
  }

  /**
   * Adds a empty video url to both state and view
   */
  handleProjectFormVideoUrlAddButtonClick() {
    const previousVideoUrls = this.model.findProjectFormState().videoUrls;

    this.model.updateProjectFormState({
      videoUrls: previousVideoUrls.concat(''),
    }, ({ videoUrls }) => {
      this.view.renderVideoUrlInputs(videoUrls);
    });
  }

  /**
   * Changes video url to have target index
   * @param {Number} targetIndex
   * @param {String} videoUrl
   */
  handleProjectFormVideoUrlInput(targetIndex, videoUrl) {
    const { videoUrls: previousVideoUrls } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      videoUrls: previousVideoUrls.map((previousVideoUrl, index) => (index === targetIndex ? videoUrl : previousVideoUrl)),
    });
  }

  /**
   * Delete video url input with index
   * @param {Number} targetIndex
   */
  handleProjectFormVideoUrlRemoveButtonClick(targetIndex) {
    const { videoUrls: previousVideoUrls } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      videoUrls: previousVideoUrls.filter((previousVideoUrl, index) => index !== targetIndex),
    }, ({ videoUrls }) => {
      this.view.renderVideoUrlInputs(videoUrls);
    });
  }

  /**
   * Stores snapshot file and renders added snapshot preview
   * @param {File} file
   */
  handleProjectFormSnapshotAdded(file) {
    const { snapshots } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      snapshots: snapshots.concat(file),
    }, async () => {
      const snapshotDataUrl = await readFileAsDataUrl(file);
      this.view.addSnapshotPreview(snapshotDataUrl);
    });
  }

  /**
   * Removes snapshot with index
   * @param {Number} targetIndex
   */
  handleProjectFormSnapshotRemoved(targetIndex) {
    const { snapshots } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      snapshots: snapshots.filter((snapshot, index) => targetIndex !== index),
    }, () => {
      this.view.removeSnapshotPreview(targetIndex);
    });
  }

  /**
   * Change snapshot file and preview at target index into snapshot preview container
   * @param {Number} targetIndex
   * @param {File} file
   */
  handleProjectFormSnapshotUpdated(targetIndex, file) {
    const { snapshots } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      snapshots: snapshots.map((snapshotFile, index) => (index === targetIndex ? file : snapshotFile)),
    }, async () => {
      const snapshotPreviewDataUrl = await readFileAsDataUrl(file);
      this.view.updateSnapshotPreview(targetIndex, snapshotPreviewDataUrl);
    });
  }
}
