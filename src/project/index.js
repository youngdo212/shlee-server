import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import App from './app';
import Loader from './loader';
import SnapshotList from './snapshotList';

const loader = new Loader({wait: 200});
const snapshotList = new SnapshotList();
const app = new App(loader, snapshotList, {limit: 4});

window.addEventListener('DOMContentLoaded', () => {
  app.addSnapshots();
});