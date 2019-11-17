import { throttle, raf } from './helpers';

export default class Loader {
  constructor({wait} = {}) {
    this.wait = wait;
    this.$loader = document.querySelector('.loader');
    this.throttledHandler = null;
    this.load = raf(this.load.bind(this));
  }

  /**
   * @returns {Element}
   */
  getElement() {
    return this.$loader;
  }

  /**
   * Adds event handelr
   * @param {Function()} handler 
   */
  on(handler) {
    this.throttledHandler = throttle(() => {
      handler();
      this.getElement().classList.remove('loader--loading');
    }, this.wait);

    window.addEventListener('scroll', this.load);
  }

  /**
   * Stops to trigger event
   */
  off() {
    window.removeEventListener('scroll', this.load);
    this.getElement().classList.add('loader--stop');
  }

  load() {
    if (!this.isVisible()) return;

    this.getElement().classList.add('loader--loading');
    this.throttledHandler();
  }

  isVisible() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const {top: targetTop, bottom: targetBottom} = this.getElement().getBoundingClientRect();
  
    return targetBottom > 0 && targetTop < viewportHeight;
  }
}