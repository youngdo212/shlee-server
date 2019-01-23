import {Observer} from './helper.js';
import {snapshot as template} from './template.js';

export default class SectionSnapshot {
  constructor({element}) {
    this.$section = element;
    this.column = this.$section.dataset.column;

    this.observer = new Observer(this._makeSnapshotVisible.bind(this));
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
    snapshot.widthRatio = 100/this.column;
    this.$section.insertAdjacentHTML('beforeend', template(snapshot));
    return this.$section.lastElementChild;
  }

  _observe(snapshot) {
    this.observer.observe(snapshot)
  }
}