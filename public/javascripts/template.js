export const project = ({id, title, thumbnailImageUrl, quickViewUrl}) => {
  return (
    `<a class="project project--invisible" href="/project/${id}" data-id="${id}" data-title="${title}" data-quick-view-url="${quickViewUrl}">
      <img class="project__image" src="${thumbnailImageUrl}" alt="${title}">
      <div class="project__header">
        <div class="project__title">${title}</div>
      </div>
      <div class="project__footer">
        <div class="project__quick-view">
          <span class="project__quick-view-icon"><i class="fas fa-eye"></i></span>
          <span class="project__quick-view-text">Quick view</span>
        </div>
      </div>
    </a>`
  );
}

export const snapshot = ({title, imageUrl, widthRatio}) => {
  return `<img class="snapshot snapshot--invisible" style="width: ${widthRatio}%" src="${imageUrl}" alt="${title}">`;
};

export const addedInput = ({id, name}) => {
  return () => `
    <div class="added-input">
      <input class ="form__input form__input--text" id="${id}" name="${name}">
      <button class="added-input__button" type="button">
    </div>`
}

export const thumbnailPreviewItem = ({src}) => {
  return `
    <div class="thumbnail-preview__item">
      <img class="thumbnail-preview__image" src="${src}">`
}

export const headerImagePreviewItem = ({src}) => {
  return `
    <div class="header-image-preview__item">
      <img class="header-image-preview__image" src="${src}">`
}

export const snapshotPreviewItem = ({src}) => {
  return `
    <div class="snapshot-preview__item">
      <img class="snapshot-preview__image" src="${src}">`
}