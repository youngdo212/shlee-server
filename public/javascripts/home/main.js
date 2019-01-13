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
});

const view = {
  section: new SectionProject({
    element: document.querySelector('section'),
  }),
  loader: new Loader({
    element: document.querySelector('.loader'),
    url: `${window.location.origin}/api/project`,
  }),
  modal: new Modal({
    modal: document.querySelector('.modal'),
  }),
}

const controller = new Controller(view);

const showreelButton = document.querySelector('.header__showreel');

showreelButton.addEventListener('click', view.modal.open.bind(view.modal, {
  videoUrl: 'https://player.vimeo.com/video/193029459?title=0&byline=0&portrait=0',
}));