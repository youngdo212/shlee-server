import {ajax, Observer} from './helper.js';

export default class Loader {
  constructor({loader, handler, url, limit = 4}) {
    this.offset = 0;
    this.limit = limit;
    this.loader = loader;
    this.handler = handler;
    this.url = url;
    this.observer = new Observer({
      callback: this.load.bind(this),
    })
    this.observer.observe(this.loader);
    this.load();
  }

  load() {
    this.loader.classList.add('loader--loading');

    ajax({
      method: 'GET',
      url: `${this.url}?limit=${this.limit}&offset=${this.offset}`,
      callback: this.execute.bind(this),
    });

    this.offset += this.limit;
  }

  execute(data) {
    const projects = JSON.parse(data);

    projects.length ? this.handler(projects) : this.stop();
    this.loader.classList.remove('loader--loading');
  }

  stop() {
    this.observer.unobserve(this.loader);
    this.loader.classList.add('loader--stop');
  }
}