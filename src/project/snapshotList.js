export default class SnapshotList {
  constructor() {
    this.$snapshotList = document.querySelector('section');
  }

  /**
   * @returns {Element}
   */
  getElement() {
    return this.$snapshotList;
  }

  /**
   * @param {Snapshot[]} snapshots 
   */
  add(snapshots) {
    const $snapshotList = this.getElement();

    snapshots.forEach((snapshot) => snapshot.render($snapshotList));
  }
}