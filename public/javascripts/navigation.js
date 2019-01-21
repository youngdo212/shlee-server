export default class Navigation {
  constructor({element, header = null, isMobile = false}) {
    this.$navigation = element;
    this.$header = header;
    this.$itemList = this.$navigation.querySelector('.navigation__item-list');
    this.$button = this.$navigation.querySelector('.navigation__button');
    this.isAttached = false; // is attached to viewport
    this.isButtonActive = false;
    this.previousScrollTop = 0;
    this.isMobile = isMobile;

    this._registerListener();
  }

  _registerListener() {
    window.addEventListener('scroll', () => {
      this._isEscaped() ? this._attach() : this._detach();
      this._isScrolledUp() ? this._expand() : this._collapse();
      this.previousScrollTop = window.scrollY;
    })

    this.$button.addEventListener('click', this._toggleButton.bind(this));
  }

  _isEscaped() {
    if(!this.$header) return false;

    const currentScrollTop = window.scrollY;

    return currentScrollTop > this.$header.offsetHeight + this.$header.offsetTop;
  }

  _isScrolledUp() {
    const currentScrollTop = window.scrollY;

    return currentScrollTop < this.previousScrollTop;
  }

  // attach to viewport
  _attach() {
    this.isAttached && this.$navigation.classList.add('navigation--stay-attached');
    if(!this.isMobile) {
      !this.isAttached && this.$itemList.classList.add('navigation__item-list--active');
      !this.isAttached && this.$itemList.classList.remove('navigation__item-list--deactive');
      !this.isAttached && this.$button.classList.add('navigation__button--disappear');
    }
    this.$navigation.classList.add('navigation--attached');
    this.$navigation.classList.remove('navigation--detached');
    this.isAttached = true;
  }

  // detach to viewport
  _detach() {
    this.$navigation.classList.add('navigation--detached');
    if(!this.isMobile) {
      this.isAttached && this.$itemList.classList.add('navigation__item-list--deactive');
      this.isAttached && this.$itemList.classList.remove('navigation__item-list--active');
      this.isAttached && this.$button.classList.remove('navigation__button--disappear');
    }
    this.$navigation.classList.remove('navigation--attached');
    this.$navigation.classList.remove('navigation--stay-attached');
    this.isAttached = false;
  }

  _expand() {
    if(!this.isAttached) return;

    this.$navigation.classList.remove('navigation--collapse');
  }

  _collapse() {
    if(!this.isAttached) return;

    this.$navigation.classList.add('navigation--collapse');
  }

  _toggleButton() {
    // register deactive button handler
    !this.isButtonActive && window.addEventListener('scroll', () => {
      if(!this.isButtonActive) return;
      this._toggleButton();
    }, {once: true});

    this.$button.classList.toggle('navigation__button--active');
    this.$itemList.classList.toggle('navigation__item-list--active');
    this.$itemList.classList.toggle('navigation__item-list--deactive');
    this.isButtonActive = !this.isButtonActive;
  }
}