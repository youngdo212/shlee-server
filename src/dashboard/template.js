export default {
  /**
   * @param {Project} project
   * @param {String} project.id
   * @param {String} project.title
   */
  projectListItem({ id, title }) {
    return `
      <li class="index-section__project" data-id="${id}">
        <div class="index-section__project-title">${title}</div>
      </li>`;
  },

  /**
   * @param {String} url
   */
  thumbnailPreviewImage(url) {
    return `<img class="thumbnail-preview__image" src="${url}">`;
  },

  videoUrlInput({ index, videoUrl }) {
    return `
      <div class="added-input" data-index="${index}">
        <input class="form__input form__input--video-url" id="video-url" name="video-url" value="${videoUrl}">
        <button class="added-input__button" type="button">
          <i class="fas fa-minus-circle"></i>
        </button>
      </div>`;
  },
};
