export default class stickyNavigation {
  constructor({navigation, disableTop}) {
    this.navigation = navigation;
    this.disableTop = disableTop;
    this.previousScrollTop = 0;
    this.registerListener();
  }

  registerListener() {
    window.addEventListener('scroll', () => {
      const currentScrollTop = document.documentElement.scrollTop;

      currentScrollTop < this.disableTop ? this.navigation.classList.remove('sticky-nav--visible') : this.checkScrollDirection(currentScrollTop);
      this.previousScrollTop = currentScrollTop;
    })
  }

  checkScrollDirection(currentScrollTop) {
    this.previousScrollTop < currentScrollTop ? this.navigation.classList.remove('sticky-nav--visible') : this.navigation.classList.add('sticky-nav--visible');
  }
}