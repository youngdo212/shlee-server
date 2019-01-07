import MenuItemView from './menuItemView.js';

export default class MenuView {
  constructor({menuItems, wrapper, toggleButton, color}) {
    this.selectedMenuItem = null;
    this.wrapper = wrapper;
    this.toggleButton = toggleButton;
    this.isActive = !!toggleButton ? false : true;
    this.menuItemViews = null;

    this.render({
      menuItems,
      wrapper,
      hasToggleButton: !!toggleButton,
      color,
    });
    this.toggleButton && this.registerToggleButtonHandler();
    this.setSelectedMenuItem(menuItems[0]);
  }

  render({menuItems, wrapper, hasToggleButton, color}) {
    this.menuItemViews = menuItems.map((menuItem) => {
      const menuItemView = new MenuItemView({
        menuItem,
        wrapper,
        color
      });

      menuItemView.bindClickMenuItemHandler(this.setSelectedMenuItem.bind(this));

      return menuItemView;
    });

    hasToggleButton && this.wrapper.classList.add('menu-animation')
  }

  setSelectedMenuItem(menuItem) {
    this.selectedMenuItem = menuItem;
    this.menuItemViews.forEach((menuItemView) => {
      menuItemView.getMenuItem() === this.selectedMenuItem ? menuItemView.activate() : menuItemView.deactivate();
    })
  }

  registerToggleButtonHandler() {
    this.toggleButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isActive ? this.deactivate() : this.activate();
    })
  }

  activate() {
    this.toggleButton.classList.add('nav__menu-button--active');
    this.wrapper.classList.add('menu-animation--active');
    this.wrapper.classList.remove('menu-animation--deactive');
    this.isActive = true;
    this.registerCloseMenuHandler();
  }

  registerCloseMenuHandler() {
    window.addEventListener('scroll', () => {
      this.deactivate();
    }, {once: true});
  }

  deactivate() {
    this.toggleButton.classList.remove('nav__menu-button--active');
    this.wrapper.classList.remove('menu-animation--active');
    this.wrapper.classList.add('menu-animation--deactive');
    this.isActive = false;
  }
}