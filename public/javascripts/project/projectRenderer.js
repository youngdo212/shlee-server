import {ajax} from '../helper.js';
import * as template from '../template.js';

export default class ProjectRenderer {
  constructor({header, video, detailList, url}) {
    this.$header = header;
    this.$video = video;
    this.$detailList = detailList;

    this.$headerTitle = this.$header.querySelector('.header__title');
    this.$headerImage = this.$header.querySelector('.header__image');
    this.$videoIframe = this.$video.querySelector('iframe');
    this.$videoLoadingIcon = this.$video.querySelector('.video__loading-icon');

    this._registerEventLister();

    ajax({
      method: 'GET',
      url,
      callback: (data) => {
        const project = JSON.parse(data);
        this._render(project);
      },
    })
  }

  _registerEventLister() {
    this.$videoIframe.addEventListener('load', () => {
      this.$videoLoadingIcon.classList.add('video__loading-icon--disappear');
    }, {once: true});
  }

  _render(project) {
    this.$headerTitle.textContent = project.title;
    this.$headerImage.src = project.headerImageUrl;
    this.$videoIframe.src = project.videoUrl;
    this.$detailList.innerHTML = template.detailListItem(project);
  }
}