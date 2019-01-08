import {ajax, Observer} from './helper.js';

export default class Loader {
  constructor({loader, handler, url}) {
    this.index = 0;
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
      url: this.url,
      callback: this.execute.bind(this),
    });
  }

  execute(data) {
    const projects = JSON.parse(data);

    this.handler(projects);
    this.observer.unobserve(this.loader);
    this.loader.classList.remove('loader--loading');
  }
}