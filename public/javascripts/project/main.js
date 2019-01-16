import Navigation from '../navigation.js';
import SectionSnapshot from '../sectionSnapshot.js';
import Loader from '../loader.js';
import Controller from '../controller.js';

import {navigationItems} from '../data.js';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  items: navigationItems,
});

const view = {
  section: new SectionSnapshot({
    element: document.querySelector('section'),
  }),
  loader: new Loader({
    element: document.querySelector('.loader'),
    url: `${window.location.origin}/api${window.location.pathname.replace(/\/project/, '/project/snapshot')}`,
    limit: 4,
  }),
};

const controller = new Controller(view);