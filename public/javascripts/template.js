export const project = ({id, title, thumbnailImageUrl, videoUrl}) => {
  return (
    `<a class="project project--invisible" href="/project/${id}" data-id="${id}" data-title="${title}" data-video-url="${videoUrl}">
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

export const detailListItem = ({client, agency, role}) => {
  return `
  <li class="detail-list-item detail-list-item--client"><span class="detail-list-item__name">Client</span><span class="detail-list-item__description">${client}</span></li>
  <li class="detail-list-item detail-list-item--agency"><span class="detail-list-item__name">Agency</span><span class="detail-list-item__description">${agency}</span></li>
  <li class="detail-list-item detail-list-item--role"><span class="detail-list-item__name">Role</span><span class="detail-list-item__description">${role}</span></li>`
};