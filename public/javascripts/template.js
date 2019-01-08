export const projectView = ({title, thumbnailImageUrl}) => {
  return (
    `<div class="project project--invisible">
      <img class="project__image" src="${thumbnailImageUrl}" alt="${title}">
      <div class="project__header">
        <div class="project__title">${title}</div>
      </div>
      <div class="project__footer">
      <div class="project__quick-view">
        <span class="project__quick-view-icon"><i class="fas fa-eye"></i></span>
        <span class="project__quick-view-text">Quick view</span>
      </div>
    </div>`
  );
}

export const menuItemView = ({name, path, color = "#000"}) => {
  return (
    `<a href="${path}" style="color: ${color}" class="menu-item">
      <div class="menu-item__name">${name}</div>
      <div class="menu-item__underline"></div>
    </a>`
  );
}