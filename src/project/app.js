import Snapshot from './snapshot';

export default class App {
  /**
   * @param {Loader} loader
   * @param {SnapshotList} snapshotList
   * @param {Object} options
   * @param {Number} options.limit number of snapshot to be loaded from server
   */
  constructor(loader, snapshotList, {limit}) {
    this.loader = loader;
    this.snapshotList = snapshotList;
    this.offset = 0;
    this.limit = limit;

    this.loader.on(this.addSnapshots.bind(this));
  }

  /**
   * Loads snapshot from server and Adds snapshot to snapshot list
   */
  async addSnapshots() {
    const response = await fetch(`${window.location.origin}/api${window.location.pathname}/snapshot?limit=${this.limit}&offset=${this.offset}`);
    const snapshots = await response.json();

    if (!snapshots.length) return this.stop();

    this.snapshotList.add(snapshots.map((snapshot) => new Snapshot(snapshot)));
    this.offset = this.offset + this.limit;
  }

  /**
   * Makes app not to load snapshots anymore
   */
  stop() {
    this.loader.off();
  }
}