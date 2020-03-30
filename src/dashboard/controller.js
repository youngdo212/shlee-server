import axios from 'axios';
import MESSAGE from './msg';
import { readFileAsDataUrl, createFormData, moveArrayElement } from './helpers';

export default class Controller {
  /**
   * @param {Model} model
   * @param {View} view
   * @param {Function} validator
   */
  constructor(model, view, validator) {
    this.model = model;
    this.view = view;
    this.validator = validator;

    this.view.onProjectFormOpenButtonClick(this.handleProjectFormOpenButtonClick.bind(this));
    this.view.onProjectFormCloseButtonClick(this.handleProjectFormCloseButtonClick.bind(this));
    this.view.onProjectFormTitleInput(this.handleProjectFormTitleInput.bind(this));
    this.view.onProjectFormHeaderInput(this.handleProjectFormHeaderInput.bind(this));
    this.view.onProjectFormQuickViewUrlInput(this.handleProjectFormQuickViewUrlInput.bind(this));
    this.view.onProjectFormClientInput(this.handleProjectFormClientInput.bind(this));
    this.view.onProjectFormAgencyInput(this.handleProjectFormAgencyInput.bind(this));
    this.view.onProjectFormRoleInput(this.handleProjectFormRoleInput.bind(this));
    this.view.onProjectFormThumbnailInputChange(this.handleProjectFormThumbnailChange.bind(this));
    this.view.onProjectFormVideoUrlAddButtonClick(this.handleProjectFormVideoUrlAddButtonClick.bind(this));
    this.view.onProjectFormVideoUrlInput(this.handleProjectFormVideoUrlInput.bind(this));
    this.view.onProjectFormVideoUrlRemoveButtonClick(this.handleProjectFormVideoUrlRemoveButtonClick.bind(this));
    this.view.onProjectFormSnapshotAdded(this.handleProjectFormSnapshotAdded.bind(this));
    this.view.onProjectFormSnapshotRemoved(this.handleProjectFormSnapshotRemoved.bind(this));
    this.view.onProjectFormSnapshotUpdated(this.handleProjectFormSnapshotUpdated.bind(this));
    this.view.onProjectFormCategoryChange(this.handleProjectFormCategoryChange.bind(this));
    this.view.onProjectFormHeaderImageInputChange(this.handleProjectFormHeaderImageInputChange.bind(this));
    this.view.onProjectFormSnapshotColumnInput(this.handleProjectFormSnapshotColumnInput.bind(this));
    this.view.onProjectFormSubmit(this.handleProjectFormSubmit.bind(this));
    this.view.onProjectClick(this.handleProjectClick.bind(this));
    this.view.onProjectRemoveButtonClick(this.handleProjectRemoveButtonClick.bind(this));
    this.view.onProjectSorted(this.handleProjectSorted.bind(this));
  }

  /**
   * Sets up inital state of model and view
   */
  async setView() {
    const { data: projects } = await axios.get(`${document.location.origin}/project`);
    this.model.updateProjectList(projects, (projectList) => {
      console.log(projectList);
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

      this.resetProjectForm();
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
  }

  /**
   * Makes project form invisible
   */
  closeProjectForm() {
    this.model.updateProjectFormState({
      isOpened: false,
    }, (projectFormState) => {
      this.view.setProjectFormVisibility(projectFormState.isOpened);
      this.resetProjectForm();
    });
  }

  /**
   * Resets project form
   */
  resetProjectForm() {
    this.model.updateProjectFormState({
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
    }, () => {
      this.view.clearProjectFormValues();
      this.view.clearAllValidatonMessages();
    });
  }

  /**
   * Handles title string value
   * @param {String} title
   */
  handleProjectFormTitleInput(title) {
    this.model.updateProjectFormState({ title });
  }

  handleProjectFormHeaderInput(header) {
    this.model.updateProjectFormState({ header });
  }

  /**
   * @param {String} quickViewUrl
   */
  handleProjectFormQuickViewUrlInput(quickViewUrl) {
    this.model.updateProjectFormState({ quickViewUrl });
  }

  /**
   * @param {String} client
   */
  handleProjectFormClientInput(client) {
    this.model.updateProjectFormState({ client });
  }

  /**
   * @param {String} agency
   */
  handleProjectFormAgencyInput(agency) {
    this.model.updateProjectFormState({ agency });
  }

  /**
   * @param {String} role
   */
  handleProjectFormRoleInput(role) {
    this.model.updateProjectFormState({ role });
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
   * @param {File[]} files
   */
  handleProjectFormSnapshotAdded(files) {
    const { snapshots } = this.model.findProjectFormState();

    this.model.updateProjectFormState({
      snapshots: snapshots.concat(files),
    }, async () => {
      const snapshotDataUrls = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
      snapshotDataUrls.forEach((snapshotDataUrl) => this.view.addSnapshotPreview(snapshotDataUrl));
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

  /**
   * Change category
   * @param {String} category
   */
  handleProjectFormCategoryChange(category) {
    this.model.updateProjectFormState({ category });
  }

  /**
   * Changes header image file and renders preview
   * @param {File} file
   */
  handleProjectFormHeaderImageInputChange(file) {
    this.model.updateProjectFormState({
      headerImage: file,
    }, async () => {
      const headerImageDataUrl = await readFileAsDataUrl(file);
      this.view.renderHeaderImagePreview(headerImageDataUrl);
    });
  }

  /**
   * Changes snapshot column value
   * @param {Number} snapshotColumn
   */
  handleProjectFormSnapshotColumnInput(snapshotColumn) {
    this.model.updateProjectFormState({ snapshotColumn });
  }

  /**
   * Validates project form and submit
   */
  handleProjectFormSubmit() {
    const projectFormState = this.model.findProjectFormState();
    const validityState = this.validator(projectFormState);

    if (validityState.ok) {
      this.submitProjectForm(projectFormState);
    } else {
      this.showValidationMessage(validityState);
    }
  }

  /**
   * @param {Object} validityState
   */
  showValidationMessage(validityState) {
    this.view.clearAllValidatonMessages();
    this.view.setFormValidationMessage(MESSAGE.VALIDATION_FORM);
    validityState.thumbnail || this.view.setThumbnailValidationMessage(MESSAGE.VALIDATION_THUMBNAIL);
    validityState.title || this.view.setTitleValidationMessage(MESSAGE.VALIDATION_TITLE);
    validityState.headerImage || this.view.setHeaderImageValidationMessage(MESSAGE.VALIDATION_HEADER_IMAGE);
  }

  /**
   * Creates new project or updates project using project form state
   * @param {Object} projectFormState
   */
  async submitProjectForm(projectFormState) {
    if (projectFormState.id) {
      await this.updateProject(projectFormState);
    } else {
      await this.createProject(projectFormState);
    }

    this.closeProjectForm();
    this.setView();
  }

  /**
   * @param {Object} projectFormState
   */
  async updateProject({
    id, thumbnail, title, header, quickViewUrl, client, agency, role, category, headerImage, snapshotColumn, videoUrls, snapshots,
  }) {
    await axios.put(`/project/${id}`, createFormData({
      thumbnail,
      title,
      header,
      quickViewUrl,
      client,
      agency,
      role,
      category,
      headerImage,
      snapshotColumn,
    }));
    await axios.put(`/project/${id}/videos`, { videoUrls });
    await axios.put(`/project/${id}/snapshots`, createFormData({ snapshots }));
  }

  /**
   * @param {Object} projectFormState
   */
  async createProject({
    thumbnail, title, header, quickViewUrl, client, agency, role, category, headerImage, snapshotColumn, videoUrls, snapshots,
  }) {
    const { data: project } = await axios.post('/project', createFormData({
      thumbnail,
      title,
      header,
      quickViewUrl,
      client,
      agency,
      role,
      category,
      headerImage,
      snapshotColumn,
    }));

    if (videoUrls.length) await axios.post(`/project/${project.id}/videos`, { videoUrls });
    if (snapshots.length) await axios.post(`/project/${project.id}/snapshots`, createFormData({ snapshots }));
  }

  /**
   * Sets project form with project values and images
   * @param {Number} projectId
   */
  async handleProjectClick(projectId) {
    // handleProjectFormOpenButtonClick
    const { isOpened } = this.model.findProjectFormState();

    if (isOpened) {
      if (!confirm(MESSAGE.OPEN_PROJECT)) return;

      this.resetProjectForm();
    } else {
      this.openProjectForm();
    }
    // handleProjectFormOpenButtonClick

    const project = this.model.findProject(projectId);

    this.model.updateProjectFormState(project, () => {
      this.view.setProjectForm(project, { mutable: false });
    });

    project.snapshotUrls.forEach(async (snapshotUrl, index) => {
      const { data: snapshot } = await axios(`${document.location.origin}${snapshotUrl}`, { responseType: 'blob' });
      const { snapshots } = this.model.findProjectFormState();
      const snapshotCopy = snapshots.slice();

      snapshotCopy[index] = snapshot;

      this.model.updateProjectFormState({
        snapshots: snapshotCopy,
      }, () => {
        this.view.setSnapshotPreviewMutability(index, true);
      });
    });

    const { data: thumbnail } = await axios(`${document.location.origin}${project.thumbnailImageUrl}`, { responseType: 'blob' });

    this.model.updateProjectFormState({
      thumbnail,
    });

    const { data: headerImage } = await axios(`${document.location.origin}${project.headerImageUrl}`, { responseType: 'blob' });

    this.model.updateProjectFormState({
      headerImage,
    });
  }

  /**
   * Removes project using project id
   * @param {Number} projectId
   */
  async handleProjectRemoveButtonClick(projectId) {
    if (!confirm(MESSAGE.REMOVE_PROJECT)) return;

    const { id } = this.model.findProjectFormState();

    if (projectId === id) {
      this.closeProjectForm();
    }

    await axios.delete(`${document.location.origin}/project/${projectId}/videos`);
    await axios.delete(`${document.location.origin}/project/${projectId}/snapshots`);
    await axios.delete(`${document.location.origin}/project/${projectId}`);
    await this.setView();
  }

  /**
   * Sorts project list
   *
   * @param {Number} oldIndex
   * @param {Number} newIndex
   */
  handleProjectSorted(oldIndex, newIndex) {
    const oldProjectList = this.model.findProjectList();
    const sortedProjectList = moveArrayElement(oldProjectList, oldIndex, newIndex);

    this.model.updateProjectList(sortedProjectList, (projectList) => {
      projectList.forEach((project, index) => {
        axios.put(`${document.location.origin}/project/${project.id}/sort-index`, {
          index,
        });
      });
    });
  }
}
