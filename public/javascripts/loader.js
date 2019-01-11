import {ajax} from './helper.js';

export default class Loader {
  constructor({element, url, limit = 4}) {
    this.$loader = element;
    this.url = url;
    this.limit = limit;
    this.offset = 0;
    this.handler = null;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        this._load();
      });
    });
    this.observer.observe(this.$loader);
  }

  bindAddItems(handler) {
    this.handler = handler;
  }

  _load() {
    this.$loader.classList.add('loader--loading');

    ajax({
      method: 'GET',
      url: `${this.url}?limit=${this.limit}&offset=${this.offset}`,
      callback: this._execute.bind(this),
    });

    this.offset += this.limit;
  }

  _execute(data) {
    const item = JSON.parse(data);

    this.$loader.classList.remove('loader--loading');
    item.length ? this.handler(item) : this._stop();
  }

  _stop() {
    this.observer.unobserve(this.$loader);
    this.$loader.classList.add('loader--stop');
  }
}