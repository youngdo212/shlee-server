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