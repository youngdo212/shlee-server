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
};
