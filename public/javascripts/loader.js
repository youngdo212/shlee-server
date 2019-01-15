import {ajax} from './helper.js';

export default class Loader {
  constructor({element, url, queryString = {}, limit = 4}) {
    this.$loader = element;
    this.url = url;
    this.queryString = this._createQueryString(queryString);
    this.limit = limit;
    this.offset = 0;
    this.handler = null;

    this.observer = this._createObserver(this._load.bind(this));
    this.observer.observe(this.$loader);
  }

  bindAddItems(handler) {
    this.handler = handler;
  }

  _createObserver(handler) {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        handler();
      });
    });
  }

  _load() {
    this.$loader.classList.add('loader--loading');

    ajax({
      method: 'GET',
      url: `${this.url}?limit=${this.limit}&offset=${this.offset}&${this.queryString}`,
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

  _createQueryString(oQueryString) {
    return Object.entries(oQueryString).reduce((qs, keyValuePair, index) => qs + `${index === 0 ? '' : '&'}${keyValuePair[0]}=${keyValuePair[1]}`, '');
  }
}