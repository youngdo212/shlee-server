export default class Modal {
  constructor({modal}) {
    this.modal = modal;
    this.closeButton = this.modal.querySelector('.modal__close-button');
    this.details = this.modal.querySelector('.modal__details');
    this.video = this.modal.querySelector('.modal__video > iframe');
    this.loadingIcon = this.modal.querySelector('.modal__loading-icon');
    this.title = this.modal.querySelector('.modal__title');

    this.registerCloseButtonHandler(this.deactivate.bind(this));
  }

  registerCloseButtonHandler(handler) {
    this.closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      handler();
    })
  }

  activate({video, title}) {
    if(!title) this.details.classList.add('modal__details--deactive'); // when showreel is clicked
    
    this.video.addEventListener('load', () => {
      this.loadingIcon.classList.add('modal__loading-icon--invisible');
    }, {once: true})

    this.video.src = video;
    this.title.textContent = title || "";
    this.modal.classList.remove('modal--deactive');
    this.modal.classList.add('modal--active');
  }

  deactivate() {
    this.modal.addEventListener('transitionend', () => {
      this.video.src = "";
      this.title.textContent = "";
      this.details.classList.remove('modal__details--deactive');
      this.loadingIcon.classList.remove('modal__loading-icon--invisible');
    }, {once: true});
    
    this.modal.classList.remove('modal--active');
    this.modal.classList.add('modal--deactive');
  }
}