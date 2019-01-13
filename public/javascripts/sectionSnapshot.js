import {snapshot as template} from './template.js';

export default class SectionSnapshot {
  constructor({element}) {
    this.$section = element;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        const snapshot = entry.target;
        this._makeSnapshotVisible(snapshot);
      });
    });
  }

  addItems(items) {
    items.forEach((item) => {
      const newSnapshot = this._render(item)

      this._observe(newSnapshot);
    })
  }

  _makeSnapshotVisible(snapshot) {
    snapshot.classList.remove('snapshot--invisible');
    this.observer.unobserve(snapshot);
  }

  _render(snapshot) {
    this.$section.insertAdjacentHTML('beforeend', template(snapshot));
    return this.$section.lastElementChild;
  }

  _observe(snapshot) {
    this.observer.observe(snapshot)
  }
}