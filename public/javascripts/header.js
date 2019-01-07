export default class Header {
  constructor({header}) {
    this.header = header;
    this.headerCover = header.querySelector('.header__cover');
    this.registerMouseEventHandler();
  }

  registerMouseEventHandler() {
    this.header.addEventListener('mouseover', (e) => {
      this.headerCover.classList.add('header__cover--active');
    })

    this.header.addEventListener('mouseleave', (e) => {
      this.headerCover.classList.remove('header__cover--active');
    })
  }
}