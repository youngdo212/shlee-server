import {menuItemView as template} from './template.js';

export default class MenuItemView {
  constructor({menuItem, wrapper, color}) {
    this.menuItem = menuItem;
    this.menuItemElement = null;
    this.render({wrapper, color})
  }

  render({wrapper, color}) {
    const styledMenuItem = Object.assign({color}, this.menuItem);
    const html = template(styledMenuItem)

    wrapper.insertAdjacentHTML('beforeend', html);
    this.menuItemElement = wrapper.lastElementChild;
  }

  bindClickMenuItemHandler(handler) {
    this.menuItemElement.addEventListener('click', (e) => {
      e.stopPropagtion();
      handler(this.menuItem);
    })
  }

  getMenuItem() {
    return this.menuItem;
  }

  activate() {
    this.menuItemElement.classList.add('menu-item--active');
  }

  deactivate() {
    this.menuItemElement.classList.remove('menu-item--active');
  }
}