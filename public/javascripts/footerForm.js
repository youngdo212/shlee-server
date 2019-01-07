export default class FooterForm {
  constructor({form, formMessage, submitMessage, rejectMessage}) {
    this.form = form;
    this.input = form.querySelector('input');
    this.formMessage = formMessage;
    this.submitMessage = submitMessage;
    this.rejectMessage = rejectMessage;
    this.registerSubmitHandler();
  }

  registerSubmitHandler() {
    this.form.addEventListener('submit', (e) => {
      this.input.validity.valid ? this.submit() : this.reject(e);
    })
  }

  submit() {
    this.formMessage.textContent = this.submitMessage;
    this.formMessage.classList.add('footer__form-message--submitted');
  }

  reject(e) {
    this.formMessage.textContent = this.rejectMessage;
    this.formMessage.classList.remove('footer__form-message--submitted');
    e.preventDefault();
  }
}