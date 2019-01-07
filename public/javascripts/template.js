export const projectView = ({title, titleColor = '#fff', description, image, video, width, heightRatio, marginRight}) => {
  return (
    `<div class="project project--invisible" style="width: ${width}; padding-top: ${heightRatio}; margin-right: ${marginRight};">
      <div class="project-inner">
        <img class="project__image" src="${image}" alt="${title}">
        <div class="project__title" style="color: ${titleColor};">${title}</div>
        <div class="project__footer">
          <div class="project__description">${description}</div>
          ${video ? '<div class="project__quick-view">Quick view</div>' : ''}
        </div>
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