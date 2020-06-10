import './polyfill';
import App from './app';
import Loader from './loader';
import SnapshotList from './snapshotList';
import Navigation from '../navigation.js';

// must refactor asap
const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  isMobile: window.matchMedia('only screen and (max-width: 425px)').matches,
});

const loader = new Loader({ wait: 200 });
const snapshotList = new SnapshotList();
const app = new App(loader, snapshotList, { limit: 4 });

window.addEventListener('DOMContentLoaded', () => {
  app.addSnapshots();
});
