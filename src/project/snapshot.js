import template from './template';

export default class Snapshot {
  /**
   * @param {Object} snapshot
   * @param {String} snapshot.imageUrl
   */
  constructor({imageUrl}) {
    this.imageUrl = imageUrl;
  }

  /**
   * @param {Element} parent 
   */
  render(parent) {
    const snapshotColumn = Number(parent.dataset.column);
    const widthRatio = 100/snapshotColumn;
    const snapshot = Object.assign({}, this, { widthRatio });

    parent.insertAdjacentHTML('beforeend', template(snapshot));
  }
}