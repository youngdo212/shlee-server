import Navigation from '../navigation.js';
import SectionProject from '../sectionProject.js';
import Loader from '../loader.js';
import Modal from '../modal.js';
import Controller from '../controller.js';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  items: [
    {name: 'Work', path: '/work'},
    {name: 'Lab', path: '/lab'},
    {name: 'Info', path: '/info'},
  ],
});

const view = {
  section: new SectionProject({
    element: document.querySelector('section'),
  }),
  loader: new Loader({
    element: document.querySelector('.loader'),
    url: 'http://127.0.0.1:3000/api/project',
  }),
  modal: new Modal({
    modal: document.querySelector('.modal'),
  }),
}

const controller = new Controller(view);

const showreelButton = document.querySelector('.header__showreel');

showreelButton.addEventListener('click', view.modal.open.bind(view.modal, {
  videoUrl: 'https://player.vimeo.com/video/295556349?title=0&byline=0&portrait=0&badge=0&color=ffffff',
}));