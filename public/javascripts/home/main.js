import Navigation from '../navigation.js';
import SectionProject from '../sectionProject.js';
import Loader from '../loader.js';
import Modal from '../modal.js';
import Controller from '../controller.js';

// only support video header in desktop
if(!window.matchMedia('only screen and (max-width: 425px)').matches) document.querySelector('.header__video').src = '/videos/showreel.mp4';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  isMobile: window.matchMedia('only screen and (max-width: 425px)').matches,
});

const view = {
  section: new SectionProject({
    element: document.querySelector('section'),
  }),
  loader: new Loader({
    element: document.querySelector('.loader'),
    url: `${window.location.origin}/api/project`,
    limit: 12,
  }),
  modal: new Modal({
    modal: document.querySelector('.modal'),
  }),
}

const controller = new Controller(view);

const showreelButton = document.querySelector('.header__showreel');

showreelButton.addEventListener('click', view.modal.open.bind(view.modal, {
  quickViewUrl: 'https://player.vimeo.com/video/370137939',
}));