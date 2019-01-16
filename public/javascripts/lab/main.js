import Navigation from '../navigation.js';
import SectionProject from '../sectionProject.js';
import Loader from '../loader.js';
import Modal from '../modal.js';
import Controller from '../controller.js';

import {navigationItems} from '../data.js';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  items: navigationItems,
  activeItemIndex: 1,
});

const view = {
  section: new SectionProject({
    element: document.querySelector('section'),
  }),
  loader: new Loader({
    element: document.querySelector('.loader'),
    url: `${window.location.origin}/api/project`,
    queryString: {category: 'lab'},
    limit: 12,
  }),
  modal: new Modal({
    modal: document.querySelector('.modal'),
  }),
}

const controller = new Controller(view);