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
        <button class="index-section__project-remove-button">삭제</button>
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

  /**
   * @param {Object} values
   * @param {String} values.url
   * @param {Boolean} values.cover
   */
  snapshotPreview({ url, cover }) {
    return `
    <div class="snapshot-preview__item">
      <img class="snapshot-preview__image" src="${url}">
      <div class="snapshot-preview__buttons">
        <button class="snapshot-preview__update-button" type="button">update</button>
        <button class="snapshot-preview__remove-button" type="button">remove</button>
      </div>
      <div class="snapshot-preview__cover ${cover ? '' : 'snapshot-preview__cover--hide'}"></div>
    </div>`;
  },

  headerImagePreview(url) {
    return `
    <div class="header-image-preview__item">
      <img class="header-image-preview__image" src="${url}">
    </div>`;
  },
};
