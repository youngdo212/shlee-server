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

export const navigation = (items) => {
  return `
    <ul class="navigation__item-list navigation__item-list--deactive">
      ${items.reduce((html, item) => {
        return html + `<li class="navigation__item"><a class="navigation__item-name" href="${item.path}">${item.name}</a></li>`
      }, '')}
    </ul>
    <div class="navigation__button"></div>
    <div class="navigation__title-wrap">
      <a class="navigation__title" href="/">sung hwan lee</a>
    </div>`;
}