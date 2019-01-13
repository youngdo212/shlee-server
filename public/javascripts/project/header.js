import {ajax} from '../helper.js';

export default class Header {
  constructor({element, url}) {
    this.$header = element;
    this.$title = this.$header.querySelector('.header__title');
    this.$image = this.$header.querySelector('.header__image');
    
    ajax({
      method: 'GET',
      url,
      callback: (data) => {
        const project = JSON.parse(data);
        this._render(project);
      },
    })
  }

  _render({title, headerImageUrl}) {
    this.$title.textContent = title;
    this.$image.src = headerImageUrl;
  }
}